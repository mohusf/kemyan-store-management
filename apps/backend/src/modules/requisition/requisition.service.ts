import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventBus } from '@nestjs/cqrs';
import { Requisition, RequisitionStatus } from './entities/requisition.entity';
import { ApprovalStep, ApprovalDecision } from './entities/approval-step.entity';
import { CreateRequisitionDto } from './dto/create-requisition.dto';
import { RequisitionStatusChangedEvent } from '../../common/events/requisition-status-changed.event';

@Injectable()
export class RequisitionService {
  constructor(
    @InjectRepository(Requisition)
    private readonly requisitionRepository: Repository<Requisition>,
    @InjectRepository(ApprovalStep)
    private readonly approvalStepRepository: Repository<ApprovalStep>,
    private readonly eventBus: EventBus,
  ) {}

  async create(dto: CreateRequisitionDto, requesterId: string): Promise<Requisition> {
    const requisition = this.requisitionRepository.create({
      ...dto,
      requesterId,
      status: RequisitionStatus.DRAFT,
    });
    return this.requisitionRepository.save(requisition);
  }

  async findAll(page = 1, limit = 20): Promise<{ data: Requisition[]; total: number }> {
    const [data, total] = await this.requisitionRepository.findAndCount({
      relations: ['approvalSteps'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }

  async findOne(id: string): Promise<Requisition> {
    const requisition = await this.requisitionRepository.findOne({
      where: { id },
      relations: ['approvalSteps'],
    });
    if (!requisition) {
      throw new NotFoundException(`Requisition with id ${id} not found`);
    }
    return requisition;
  }

  async submit(id: string): Promise<Requisition> {
    const requisition = await this.findOne(id);
    if (requisition.status !== RequisitionStatus.DRAFT) {
      throw new BadRequestException('Only draft requisitions can be submitted');
    }
    requisition.status = RequisitionStatus.PENDING_SUPERVISOR;
    const saved = await this.requisitionRepository.save(requisition);

    this.eventBus.publish(
      new RequisitionStatusChangedEvent(id, RequisitionStatus.DRAFT, RequisitionStatus.PENDING_SUPERVISOR),
    );

    return saved;
  }

  private statusToRole(status: RequisitionStatus): string {
    switch (status) {
      case RequisitionStatus.PENDING_SUPERVISOR:
        return 'supervisor';
      case RequisitionStatus.PENDING_STORE_MANAGER:
        return 'store_manager';
      case RequisitionStatus.PENDING_PROCUREMENT:
        return 'procurement';
      case RequisitionStatus.PENDING_PLANT_MANAGER:
        return 'plant_manager';
      default:
        return status;
    }
  }

  async approve(id: string, approverId: string, comments?: string): Promise<Requisition> {
    const requisition = await this.findOne(id);
    const previousStatus = requisition.status;

    const step = this.approvalStepRepository.create({
      requisitionId: id,
      approverId,
      decision: ApprovalDecision.APPROVED,
      comments,
      decidedAt: new Date(),
      stepOrder: (requisition.approvalSteps?.length || 0) + 1,
      approverRole: this.statusToRole(requisition.status),
    });
    await this.approvalStepRepository.save(step);

    const nextStatus = this.getNextApprovalStatus(requisition);
    requisition.status = nextStatus;
    const saved = await this.requisitionRepository.save(requisition);

    this.eventBus.publish(
      new RequisitionStatusChangedEvent(id, previousStatus, nextStatus),
    );

    return saved;
  }

  async reject(id: string, approverId: string, reason: string): Promise<Requisition> {
    const requisition = await this.findOne(id);
    const previousStatus = requisition.status;

    const step = this.approvalStepRepository.create({
      requisitionId: id,
      approverId,
      decision: ApprovalDecision.REJECTED,
      comments: reason,
      decidedAt: new Date(),
      stepOrder: (requisition.approvalSteps?.length || 0) + 1,
      approverRole: this.statusToRole(requisition.status),
    });
    await this.approvalStepRepository.save(step);

    requisition.status = RequisitionStatus.REJECTED;
    const saved = await this.requisitionRepository.save(requisition);

    this.eventBus.publish(
      new RequisitionStatusChangedEvent(id, previousStatus, RequisitionStatus.REJECTED),
    );

    return saved;
  }

  private getNextApprovalStatus(requisition: Requisition): RequisitionStatus {
    const value = Number(requisition.estimatedValue);
    switch (requisition.status) {
      case RequisitionStatus.PENDING_SUPERVISOR:
        if (value > 50000) return RequisitionStatus.PENDING_PLANT_MANAGER;
        if (value > 10000) return RequisitionStatus.PENDING_STORE_MANAGER;
        return RequisitionStatus.PENDING_PROCUREMENT;

      case RequisitionStatus.PENDING_STORE_MANAGER:
        if (value > 50000) return RequisitionStatus.PENDING_PLANT_MANAGER;
        return RequisitionStatus.PENDING_PROCUREMENT;

      case RequisitionStatus.PENDING_PLANT_MANAGER:
        return RequisitionStatus.PENDING_PROCUREMENT;

      case RequisitionStatus.PENDING_PROCUREMENT:
        return RequisitionStatus.APPROVED;

      default:
        return requisition.status;
    }
  }
}
