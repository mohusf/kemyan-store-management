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
  async create(@Body() body: any) {
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

  @Get(':id')
  @CheckPermissions({ action: Action.Read, subject: 'Document' })
  @ApiOperation({ summary: 'Get document by ID' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentsService.findOne(id);
  }

  @Put(':id')
  @CheckPermissions({ action: Action.Update, subject: 'Document' })
  @ApiOperation({ summary: 'Update a document' })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: any) {
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
