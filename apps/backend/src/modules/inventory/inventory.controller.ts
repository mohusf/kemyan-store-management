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
import { InventoryService } from './inventory.service';
import { IssueStockDto } from './dto/issue-stock.dto';
import { ReceiveStockDto } from './dto/receive-stock.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CheckPermissions } from '../../common/decorators/roles.decorator';
import { Action } from '../auth/casl/casl-ability.factory';

@ApiTags('inventory')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('issue')
  @CheckPermissions({ action: Action.Create, subject: 'Inventory' })
  @ApiOperation({ summary: 'Issue stock from inventory' })
  @ApiResponse({ status: 201, description: 'Stock issued' })
  async issueStock(@Body() dto: IssueStockDto, @Req() req: Request) {
    const userId = (req.user as any).id;
    return this.inventoryService.issueStock(dto, userId);
  }

  @Post('receive')
  @CheckPermissions({ action: Action.Create, subject: 'Inventory' })
  @ApiOperation({ summary: 'Receive stock into inventory' })
  @ApiResponse({ status: 201, description: 'Stock received' })
  async receiveStock(@Body() dto: ReceiveStockDto, @Req() req: Request) {
    const userId = (req.user as any).id;
    return this.inventoryService.receiveStock(dto, userId);
  }

  @Post('transfer')
  @CheckPermissions({ action: Action.Update, subject: 'Inventory' })
  @ApiOperation({ summary: 'Transfer stock between locations' })
  async transferStock(
    @Body()
    body: {
      batchId: string;
      materialId: string;
      fromLocationId: string;
      toLocationId: string;
      quantity: number;
      reason?: string;
    },
    @Req() req: Request,
  ) {
    const userId = (req.user as any).id;
    return this.inventoryService.transferStock(
      body.batchId,
      body.materialId,
      body.fromLocationId,
      body.toLocationId,
      body.quantity,
      userId,
      body.reason,
    );
  }

  @Post('adjust')
  @CheckPermissions({ action: Action.Update, subject: 'Inventory' })
  @ApiOperation({ summary: 'Adjust stock quantity' })
  async adjustStock(
    @Body()
    body: {
      batchId: string;
      materialId: string;
      locationId: string;
      quantity: number;
      reason: string;
    },
    @Req() req: Request,
  ) {
    const userId = (req.user as any).id;
    return this.inventoryService.adjustStock(
      body.batchId,
      body.materialId,
      body.locationId,
      body.quantity,
      userId,
      body.reason,
    );
  }

  @Get('balance')
  @CheckPermissions({ action: Action.Read, subject: 'Inventory' })
  @ApiOperation({ summary: 'Get running balance for material at location' })
  @ApiQuery({ name: 'materialId', required: true })
  @ApiQuery({ name: 'locationId', required: true })
  async getBalance(
    @Query('materialId') materialId: string,
    @Query('locationId') locationId: string,
  ) {
    const balance = await this.inventoryService.getRunningBalance(materialId, locationId);
    return { materialId, locationId, balance };
  }
}
