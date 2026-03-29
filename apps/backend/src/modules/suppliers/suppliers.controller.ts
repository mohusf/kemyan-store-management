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
import { SuppliersService } from './suppliers.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CheckPermissions } from '../../common/decorators/roles.decorator';
import { Action } from '../auth/casl/casl-ability.factory';

@ApiTags('suppliers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @CheckPermissions({ action: Action.Create, subject: 'Supplier' })
  @ApiOperation({ summary: 'Create a new supplier' })
  async create(@Body() body: any) {
    return this.suppliersService.create(body);
  }

  @Get()
  @CheckPermissions({ action: Action.Read, subject: 'Supplier' })
  @ApiOperation({ summary: 'List all suppliers' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.suppliersService.findAll(page, limit);
  }

  @Get(':id')
  @CheckPermissions({ action: Action.Read, subject: 'Supplier' })
  @ApiOperation({ summary: 'Get supplier by ID' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.suppliersService.findOne(id);
  }

  @Put(':id')
  @CheckPermissions({ action: Action.Update, subject: 'Supplier' })
  @ApiOperation({ summary: 'Update a supplier' })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: any) {
    return this.suppliersService.update(id, body);
  }

  @Post(':id/evaluations')
  @CheckPermissions({ action: Action.Update, subject: 'Supplier' })
  @ApiOperation({ summary: 'Add supplier evaluation' })
  async addEvaluation(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: any,
  ) {
    return this.suppliersService.addEvaluation({ ...body, supplierId: id });
  }

  @Get(':id/evaluations')
  @CheckPermissions({ action: Action.Read, subject: 'Supplier' })
  @ApiOperation({ summary: 'Get supplier evaluations' })
  async getEvaluations(@Param('id', ParseUUIDPipe) id: string) {
    return this.suppliersService.getEvaluations(id);
  }
}
