import {
  Controller,
  Get,
  Param,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { EquipmentService } from './equipment.service';
import { QueryEquipmentDto } from './dto/query-equipment.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CheckPermissions } from '../../common/decorators/roles.decorator';
import { Action } from '../auth/casl/casl-ability.factory';

@ApiTags('equipment')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get()
  @CheckPermissions({ action: Action.Read, subject: 'Equipment' })
  @ApiOperation({ summary: 'List equipment with filters and pagination' })
  async findAll(@Query() query: QueryEquipmentDto) {
    return this.equipmentService.findAll(query);
  }

  @Get('plant-units')
  @CheckPermissions({ action: Action.Read, subject: 'Equipment' })
  @ApiOperation({ summary: 'List plant units with equipment counts' })
  async getPlantUnits() {
    return this.equipmentService.getPlantUnits();
  }

  @Get('type-codes')
  @CheckPermissions({ action: Action.Read, subject: 'Equipment' })
  @ApiOperation({ summary: 'List equipment type codes' })
  async getTypeCodes() {
    return this.equipmentService.getTypeCodes();
  }

  @Get(':id')
  @CheckPermissions({ action: Action.Read, subject: 'Equipment' })
  @ApiOperation({ summary: 'Get equipment by ID' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.equipmentService.findOne(id);
  }
}
