import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ReportingService } from './reporting.service';
import { ReportQueryDto } from './dto/report-query.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CheckPermissions } from '../../common/decorators/roles.decorator';
import { Action } from '../auth/casl/casl-ability.factory';

@ApiTags('reporting')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('reporting')
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Post('generate')
  @CheckPermissions({ action: Action.Read, subject: 'Report' })
  @ApiOperation({ summary: 'Generate a report' })
  async generateReport(@Body() query: ReportQueryDto) {
    return this.reportingService.generateReport(query);
  }
}
