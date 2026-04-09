import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { Document } from './entities/document.entity';
import { DocumentAcknowledgment } from './entities/document-acknowledgment.entity';
import { DocumentSection } from './entities/document-section.entity';
import { DocumentRevision } from './entities/document-revision.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document, DocumentAcknowledgment, DocumentSection, DocumentRevision]),
    AuthModule,
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
