import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { DocumentAcknowledgment } from './entities/document-acknowledgment.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    @InjectRepository(DocumentAcknowledgment)
    private readonly acknowledgmentRepository: Repository<DocumentAcknowledgment>,
  ) {}

  async create(data: Partial<Document>): Promise<Document> {
    const doc = this.documentRepository.create(data);
    return this.documentRepository.save(doc);
  }

  async findAll(page = 1, limit = 20): Promise<{ data: Document[]; total: number }> {
    const [data, total] = await this.documentRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }

  async findOne(id: string): Promise<Document> {
    const doc = await this.documentRepository.findOne({ where: { id } });
    if (!doc) {
      throw new NotFoundException(`Document with id ${id} not found`);
    }
    return doc;
  }

  async update(id: string, data: Partial<Document>): Promise<Document> {
    const doc = await this.findOne(id);
    Object.assign(doc, data);
    return this.documentRepository.save(doc);
  }

  async acknowledge(documentId: string, userId: string): Promise<DocumentAcknowledgment> {
    const ack = this.acknowledgmentRepository.create({
      documentId,
      userId,
      acknowledgedAt: new Date(),
    });
    return this.acknowledgmentRepository.save(ack);
  }

  async getAcknowledgments(documentId: string): Promise<DocumentAcknowledgment[]> {
    return this.acknowledgmentRepository.find({
      where: { documentId },
      order: { acknowledgedAt: 'DESC' },
    });
  }
}
