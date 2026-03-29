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
import { QualityService } from './quality.service';
import { CreateInspectionDto, CreateNcrDto, UpdateNcrDto, CreateCoaDto } from './dto/create-inspection.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CheckPermissions } from '../../common/decorators/roles.decorator';
import { Action } from '../auth/casl/casl-ability.factory';

@ApiTags('quality')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('quality')
export class QualityController {
  constructor(private readonly qualityService: QualityService) {}

  @Post('inspections')
  @CheckPermissions({ action: Action.Create, subject: 'Inspection' })
  @ApiOperation({ summary: 'Create an inspection record' })
  async createInspection(@Body() body: CreateInspectionDto) {
    return this.qualityService.createInspection(body);
  }

  @Get('inspections/:id')
  @CheckPermissions({ action: Action.Read, subject: 'Inspection' })
  @ApiOperation({ summary: 'Get inspection by ID' })
  async findInspection(@Param('id', ParseUUIDPipe) id: string) {
    return this.qualityService.findInspection(id);
  }

  @Get('inspections/batch/:batchId')
  @CheckPermissions({ action: Action.Read, subject: 'Inspection' })
  @ApiOperation({ summary: 'Get inspections for a batch' })
  async findInspectionsByBatch(@Param('batchId', ParseUUIDPipe) batchId: string) {
    return this.qualityService.findInspectionsByBatch(batchId);
  }

  @Post('ncrs')
  @CheckPermissions({ action: Action.Create, subject: 'Inspection' })
  @ApiOperation({ summary: 'Create a non-conformance report' })
  async createNcr(@Body() body: CreateNcrDto) {
    return this.qualityService.createNcr(body);
  }

  @Get('ncrs')
  @CheckPermissions({ action: Action.Read, subject: 'Inspection' })
  @ApiOperation({ summary: 'List all NCRs' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAllNcrs(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.qualityService.findAllNcrs(page, limit);
  }

  @Get('ncrs/:id')
  @CheckPermissions({ action: Action.Read, subject: 'Inspection' })
  @ApiOperation({ summary: 'Get NCR by ID' })
  async findNcr(@Param('id', ParseUUIDPipe) id: string) {
    return this.qualityService.findNcr(id);
  }

  @Put('ncrs/:id')
  @CheckPermissions({ action: Action.Update, subject: 'Inspection' })
  @ApiOperation({ summary: 'Update an NCR' })
  async updateNcr(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateNcrDto) {
    return this.qualityService.updateNcr(id, body);
  }

  @Post('coas')
  @CheckPermissions({ action: Action.Create, subject: 'Inspection' })
  @ApiOperation({ summary: 'Create a Certificate of Analysis record' })
  async createCoa(@Body() body: CreateCoaDto) {
    return this.qualityService.createCoa(body);
  }

  @Get('coas/batch/:batchId')
  @CheckPermissions({ action: Action.Read, subject: 'Inspection' })
  @ApiOperation({ summary: 'Get COAs for a batch' })
  async findCoasByBatch(@Param('batchId', ParseUUIDPipe) batchId: string) {
    return this.qualityService.findCoasByBatch(batchId);
  }
}
