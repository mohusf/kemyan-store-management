import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RequisitionService } from './requisition.service';
import { CreateRequisitionDto } from './dto/create-requisition.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CheckPermissions } from '../../common/decorators/roles.decorator';
import { Action } from '../auth/casl/casl-ability.factory';

@ApiTags('requisitions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('requisitions')
export class RequisitionController {
  constructor(private readonly requisitionService: RequisitionService) {}

  @Post()
  @CheckPermissions({ action: Action.Create, subject: 'Requisition' })
  @ApiOperation({ summary: 'Create a new requisition' })
  @ApiResponse({ status: 201, description: 'Requisition created' })
  async create(@Body() dto: CreateRequisitionDto, @Req() req: Request) {
    const userId = (req.user as any).id;
    return this.requisitionService.create(dto, userId);
  }

  @Get()
  @CheckPermissions({ action: Action.Read, subject: 'Requisition' })
  @ApiOperation({ summary: 'List all requisitions' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.requisitionService.findAll(page, limit);
  }

  @Get(':id')
  @CheckPermissions({ action: Action.Read, subject: 'Requisition' })
  @ApiOperation({ summary: 'Get requisition by ID' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.requisitionService.findOne(id);
  }

  @Post(':id/submit')
  @CheckPermissions({ action: Action.Update, subject: 'Requisition' })
  @ApiOperation({ summary: 'Submit a draft requisition for approval' })
  async submit(@Param('id', ParseUUIDPipe) id: string) {
    return this.requisitionService.submit(id);
  }

  @Post(':id/approve')
  @CheckPermissions({ action: Action.Approve, subject: 'Requisition' })
  @ApiOperation({ summary: 'Approve a requisition' })
  async approve(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('comments') comments: string,
    @Req() req: Request,
  ) {
    const userId = (req.user as any).id;
    return this.requisitionService.approve(id, userId, comments);
  }

  @Post(':id/reject')
  @CheckPermissions({ action: Action.Approve, subject: 'Requisition' })
  @ApiOperation({ summary: 'Reject a requisition' })
  async reject(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('reason') reason: string,
    @Req() req: Request,
  ) {
    const userId = (req.user as any).id;
    return this.requisitionService.reject(id, userId, reason);
  }
}
