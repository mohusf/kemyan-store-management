import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CheckPermissions } from '../../common/decorators/roles.decorator';
import { Action } from '../auth/casl/casl-ability.factory';

@ApiTags('materials')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @CheckPermissions({ action: Action.Create, subject: 'Material' })
  @ApiOperation({ summary: 'Create a new material' })
  @ApiResponse({ status: 201, description: 'Material created' })
  async create(@Body() dto: CreateMaterialDto) {
    return this.materialsService.create(dto);
  }

  @Get()
  @CheckPermissions({ action: Action.Read, subject: 'Material' })
  @ApiOperation({ summary: 'List all materials' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.materialsService.findAll(page, limit);
  }

  @Get(':id')
  @CheckPermissions({ action: Action.Read, subject: 'Material' })
  @ApiOperation({ summary: 'Get material by ID' })
  @ApiResponse({ status: 200, description: 'Material found' })
  @ApiResponse({ status: 404, description: 'Material not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.materialsService.findOne(id);
  }

  @Put(':id')
  @CheckPermissions({ action: Action.Update, subject: 'Material' })
  @ApiOperation({ summary: 'Update a material' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: Partial<CreateMaterialDto>,
  ) {
    return this.materialsService.update(id, dto);
  }

  @Delete(':id')
  @CheckPermissions({ action: Action.Delete, subject: 'Material' })
  @ApiOperation({ summary: 'Delete a material' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.materialsService.remove(id);
  }
}
