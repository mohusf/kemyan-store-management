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
import { ProcurementService } from './procurement.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CheckPermissions } from '../../common/decorators/roles.decorator';
import { Action } from '../auth/casl/casl-ability.factory';

@ApiTags('procurement')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('procurement')
export class ProcurementController {
  constructor(private readonly procurementService: ProcurementService) {}

  @Post('purchase-orders')
  @CheckPermissions({ action: Action.Create, subject: 'PurchaseOrder' })
  @ApiOperation({ summary: 'Create a purchase order' })
  @ApiResponse({ status: 201, description: 'Purchase order created' })
  async createPurchaseOrder(@Body() body: { po: any; lines: any[] }) {
    return this.procurementService.createPurchaseOrder(body.po, body.lines);
  }

  @Get('purchase-orders')
  @CheckPermissions({ action: Action.Read, subject: 'PurchaseOrder' })
  @ApiOperation({ summary: 'List all purchase orders' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAllPurchaseOrders(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.procurementService.findAllPurchaseOrders(page, limit);
  }

  @Get('purchase-orders/:id')
  @CheckPermissions({ action: Action.Read, subject: 'PurchaseOrder' })
  @ApiOperation({ summary: 'Get purchase order by ID' })
  async findPurchaseOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.procurementService.findPurchaseOrder(id);
  }

  @Post('purchase-orders/:id/approve')
  @CheckPermissions({ action: Action.Approve, subject: 'PurchaseOrder' })
  @ApiOperation({ summary: 'Approve a purchase order' })
  async approvePurchaseOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
  ) {
    const userId = (req.user as any).id;
    return this.procurementService.approvePurchaseOrder(id, userId);
  }

  @Post('grn')
  @CheckPermissions({ action: Action.Create, subject: 'PurchaseOrder' })
  @ApiOperation({ summary: 'Create a goods received note' })
  async createGrn(@Body() body: any) {
    return this.procurementService.createGoodsReceivedNote(body);
  }

  @Get('grn/:id')
  @CheckPermissions({ action: Action.Read, subject: 'PurchaseOrder' })
  @ApiOperation({ summary: 'Get GRN by ID' })
  async findGrn(@Param('id', ParseUUIDPipe) id: string) {
    return this.procurementService.findGoodsReceivedNote(id);
  }
}
