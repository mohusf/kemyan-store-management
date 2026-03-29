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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ComplianceService } from './compliance.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CheckPermissions } from '../../common/decorators/roles.decorator';
import { Action } from '../auth/casl/casl-ability.factory';

@ApiTags('compliance')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('compliance')
export class ComplianceController {
  constructor(private readonly complianceService: ComplianceService) {}

  @Post('sds')
  @CheckPermissions({ action: Action.Create, subject: 'Material' })
  @ApiOperation({ summary: 'Create an SDS record' })
  async createSds(@Body() body: any) {
    return this.complianceService.createSdsRecord(body);
  }

  @Get('sds/material/:materialId')
  @CheckPermissions({ action: Action.Read, subject: 'Material' })
  @ApiOperation({ summary: 'Get SDS records for a material' })
  async findSdsByMaterial(@Param('materialId', ParseUUIDPipe) materialId: string) {
    return this.complianceService.findSdsByMaterial(materialId);
  }

  @Get('sds/material/:materialId/current')
  @CheckPermissions({ action: Action.Read, subject: 'Material' })
  @ApiOperation({ summary: 'Get current active SDS for a material' })
  async findCurrentSds(@Param('materialId', ParseUUIDPipe) materialId: string) {
    return this.complianceService.findCurrentSds(materialId);
  }

  @Post('waste')
  @CheckPermissions({ action: Action.Create, subject: 'Material' })
  @ApiOperation({ summary: 'Create a waste disposal record' })
  async createWasteRecord(@Body() body: any) {
    return this.complianceService.createWasteRecord(body);
  }

  @Get('waste')
  @CheckPermissions({ action: Action.Read, subject: 'Material' })
  @ApiOperation({ summary: 'List waste records' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findWasteRecords(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.complianceService.findWasteRecords(page, limit);
  }

  @Post('ppe/issue')
  @CheckPermissions({ action: Action.Create, subject: 'Material' })
  @ApiOperation({ summary: 'Issue PPE to a user' })
  async issuePpe(@Body() body: any) {
    return this.complianceService.issuePpe(body);
  }

  @Put('ppe/:id/return')
  @CheckPermissions({ action: Action.Update, subject: 'Material' })
  @ApiOperation({ summary: 'Return issued PPE' })
  async returnPpe(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('condition') condition: string,
  ) {
    return this.complianceService.returnPpe(id, condition);
  }

  @Get('ppe/user/:userId')
  @CheckPermissions({ action: Action.Read, subject: 'Material' })
  @ApiOperation({ summary: 'Get PPE issuances for a user' })
  async findPpeByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.complianceService.findPpeByUser(userId);
  }
}
