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
import { WarehouseService } from './warehouse.service';
import { CompatibilityService } from './services/compatibility.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CheckPermissions } from '../../common/decorators/roles.decorator';
import { Action } from '../auth/casl/casl-ability.factory';

@ApiTags('warehouse')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('warehouse')
export class WarehouseController {
  constructor(
    private readonly warehouseService: WarehouseService,
    private readonly compatibilityService: CompatibilityService,
  ) {}

  @Get('locations')
  @CheckPermissions({ action: Action.Read, subject: 'Inventory' })
  @ApiOperation({ summary: 'List all storage locations' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAllLocations(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.warehouseService.findAllLocations(page, limit);
  }

  @Get('locations/:id')
  @CheckPermissions({ action: Action.Read, subject: 'Inventory' })
  @ApiOperation({ summary: 'Get storage location by ID' })
  async findLocation(@Param('id', ParseUUIDPipe) id: string) {
    return this.warehouseService.findLocation(id);
  }

  @Post('locations')
  @CheckPermissions({ action: Action.Manage, subject: 'Inventory' })
  @ApiOperation({ summary: 'Create a storage location' })
  async createLocation(@Body() body: any) {
    return this.warehouseService.createLocation(body);
  }

  @Put('locations/:id')
  @CheckPermissions({ action: Action.Manage, subject: 'Inventory' })
  @ApiOperation({ summary: 'Update a storage location' })
  async updateLocation(@Param('id', ParseUUIDPipe) id: string, @Body() body: any) {
    return this.warehouseService.updateLocation(id, body);
  }

  @Get('zones')
  @CheckPermissions({ action: Action.Read, subject: 'Inventory' })
  @ApiOperation({ summary: 'List all zones' })
  async findAllZones() {
    return this.warehouseService.findAllZones();
  }

  @Get('zones/:id')
  @CheckPermissions({ action: Action.Read, subject: 'Inventory' })
  @ApiOperation({ summary: 'Get zone by ID' })
  async findZone(@Param('id', ParseUUIDPipe) id: string) {
    return this.warehouseService.findZone(id);
  }

  @Post('zones')
  @CheckPermissions({ action: Action.Manage, subject: 'Inventory' })
  @ApiOperation({ summary: 'Create a zone' })
  async createZone(@Body() body: any) {
    return this.warehouseService.createZone(body);
  }

  @Post('compatibility-check')
  @CheckPermissions({ action: Action.Read, subject: 'Inventory' })
  @ApiOperation({ summary: 'Check chemical compatibility for a location' })
  async checkCompatibility(
    @Body() body: { materialCompatibilityGroups: string[]; locationId: string },
  ) {
    return this.compatibilityService.validateChemicalCompatibility(
      body.materialCompatibilityGroups,
      body.locationId,
    );
  }
}
