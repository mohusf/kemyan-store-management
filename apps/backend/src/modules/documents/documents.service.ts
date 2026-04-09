import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
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
    const doc = await this.documentRepository.findOne({
      where: { id },
      relations: ['children'],
    });
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

  async getHierarchy(domain?: string, chapter?: number): Promise<Document[]> {
    const qb = this.documentRepository.createQueryBuilder('doc')
      .leftJoinAndSelect('doc.children', 'child')
      .where('doc.parentId IS NULL')
      .orderBy('doc.sortOrder', 'ASC')
      .addOrderBy('child.sortOrder', 'ASC');

    if (domain) {
      qb.andWhere('doc.domain = :domain', { domain });
    }
    if (chapter !== undefined) {
      qb.andWhere('doc.chapter = :chapter', { chapter });
    }

    const roots = await qb.getMany();

    // Recursively load deeper children
    for (const root of roots) {
      if (root.children?.length) {
        await this.loadChildrenRecursive(root.children);
      }
    }

    return roots;
  }

  private async loadChildrenRecursive(docs: Document[]): Promise<void> {
    for (const doc of docs) {
      const children = await this.documentRepository.find({
        where: { parentId: doc.id },
        order: { sortOrder: 'ASC' },
      });
      doc.children = children;
      if (children.length) {
        await this.loadChildrenRecursive(children);
      }
    }
  }

  async getByDomain(domain: string): Promise<Document[]> {
    return this.documentRepository.find({
      where: { domain },
      order: { sortOrder: 'ASC' },
    });
  }

  async getChildren(parentId: string): Promise<Document[]> {
    return this.documentRepository.find({
      where: { parentId },
      order: { sortOrder: 'ASC' },
    });
  }

  async getBreadcrumb(id: string): Promise<Document[]> {
    const breadcrumb: Document[] = [];
    let current = await this.documentRepository.findOne({ where: { id } });
    while (current) {
      breadcrumb.unshift(current);
      if (current.parentId) {
        current = await this.documentRepository.findOne({ where: { id: current.parentId } });
      } else {
        break;
      }
    }
    return breadcrumb;
  }

  async getDomainCounts(): Promise<{ domain: string; count: number }[]> {
    const result = await this.documentRepository
      .createQueryBuilder('doc')
      .select('doc.domain', 'domain')
      .addSelect('COUNT(*)', 'count')
      .where('doc.domain IS NOT NULL')
      .groupBy('doc.domain')
      .getRawMany();

    return result.map((r) => ({ domain: r.domain, count: parseInt(r.count, 10) }));
  }
}
