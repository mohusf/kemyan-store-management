import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto, UpdateDocumentDto } from './dto/create-document.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CheckPermissions } from '../../common/decorators/roles.decorator';
import { Action } from '../auth/casl/casl-ability.factory';

@ApiTags('documents')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @CheckPermissions({ action: Action.Create, subject: 'Document' })
  @ApiOperation({ summary: 'Create a document record' })
  async create(@Body() body: CreateDocumentDto) {
    return this.documentsService.create(body);
  }

  @Get()
  @CheckPermissions({ action: Action.Read, subject: 'Document' })
  @ApiOperation({ summary: 'List all documents' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.documentsService.findAll(page, limit);
  }

  @Get('hierarchy')
  @CheckPermissions({ action: Action.Read, subject: 'Document' })
  @ApiOperation({ summary: 'Get document hierarchy tree' })
  @ApiQuery({ name: 'domain', required: false })
  @ApiQuery({ name: 'chapter', required: false, type: Number })
  async getHierarchy(
    @Query('domain') domain?: string,
    @Query('chapter') chapter?: number,
  ) {
    return this.documentsService.getHierarchy(domain, chapter);
  }

  @Get('domains')
  @CheckPermissions({ action: Action.Read, subject: 'Document' })
  @ApiOperation({ summary: 'Get domain counts' })
  async getDomainCounts() {
    return this.documentsService.getDomainCounts();
  }

  @Get(':id')
  @CheckPermissions({ action: Action.Read, subject: 'Document' })
  @ApiOperation({ summary: 'Get document by ID' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentsService.findOne(id);
  }

  @Get(':id/children')
  @CheckPermissions({ action: Action.Read, subject: 'Document' })
  @ApiOperation({ summary: 'Get child documents' })
  async getChildren(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentsService.getChildren(id);
  }

  @Get(':id/breadcrumb')
  @CheckPermissions({ action: Action.Read, subject: 'Document' })
  @ApiOperation({ summary: 'Get document breadcrumb path' })
  async getBreadcrumb(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentsService.getBreadcrumb(id);
  }

  @Put(':id')
  @CheckPermissions({ action: Action.Update, subject: 'Document' })
  @ApiOperation({ summary: 'Update a document' })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateDocumentDto) {
    return this.documentsService.update(id, body);
  }

  @Post(':id/acknowledge')
  @CheckPermissions({ action: Action.Read, subject: 'Document' })
  @ApiOperation({ summary: 'Acknowledge a document' })
  async acknowledge(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
  ) {
    const userId = (req.user as any).id;
    return this.documentsService.acknowledge(id, userId);
  }

  @Get(':id/acknowledgments')
  @CheckPermissions({ action: Action.Read, subject: 'Document' })
  @ApiOperation({ summary: 'Get document acknowledgments' })
  async getAcknowledgments(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentsService.getAcknowledgments(id);
  }
}
