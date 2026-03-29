import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ReportQueryDto, ReportType } from './dto/report-query.dto';

export interface ReportResult {
  reportType: string;
  generatedAt: Date;
  dateFrom: string;
  dateTo: string;
  data: any[];
  summary: Record<string, any>;
}

@Injectable()
export class ReportingService {
  constructor(private readonly dataSource: DataSource) {}

  async generateReport(query: ReportQueryDto): Promise<ReportResult> {
    const { dateFrom, dateTo, reportType, filters } = query;

    let data: any[] = [];
    let summary: Record<string, any> = {};

    switch (reportType) {
      case ReportType.INVENTORY_SUMMARY:
        ({ data, summary } = await this.inventorySummaryReport(dateFrom, dateTo, filters));
        break;
      case ReportType.STOCK_MOVEMENT:
        ({ data, summary } = await this.stockMovementReport(dateFrom, dateTo, filters));
        break;
      case ReportType.EXPIRY_REPORT:
        ({ data, summary } = await this.expiryReport(dateFrom, dateTo, filters));
        break;
      case ReportType.REORDER_REPORT:
        ({ data, summary } = await this.reorderReport(filters));
        break;
      case ReportType.SUPPLIER_PERFORMANCE:
        ({ data, summary } = await this.supplierPerformanceReport(dateFrom, dateTo, filters));
        break;
      default:
        data = [];
        summary = { message: 'Report type not yet implemented' };
    }

    return {
      reportType,
      generatedAt: new Date(),
      dateFrom,
      dateTo,
      data,
      summary,
    };
  }

  private async inventorySummaryReport(
    dateFrom: string,
    dateTo: string,
    filters?: Record<string, any>,
  ): Promise<{ data: any[]; summary: Record<string, any> }> {
    const result = await this.dataSource.query(`
      SELECT
        b.material_id,
        SUM(b.quantity_available) as total_available,
        COUNT(*) as batch_count
      FROM batches b
      WHERE b.created_at BETWEEN $1 AND $2
      GROUP BY b.material_id
      ORDER BY total_available DESC
    `, [dateFrom, dateTo]);

    return {
      data: result,
      summary: { totalMaterials: result.length },
    };
  }

  private async stockMovementReport(
    dateFrom: string,
    dateTo: string,
    filters?: Record<string, any>,
  ): Promise<{ data: any[]; summary: Record<string, any> }> {
    const result = await this.dataSource.query(`
      SELECT
        t.material_id,
        t.transaction_type,
        SUM(t.quantity) as total_quantity,
        COUNT(*) as transaction_count
      FROM inventory_transactions t
      WHERE t.created_at BETWEEN $1 AND $2
      GROUP BY t.material_id, t.transaction_type
      ORDER BY t.material_id
    `, [dateFrom, dateTo]);

    return {
      data: result,
      summary: { totalTransactions: result.length },
    };
  }

  private async expiryReport(
    dateFrom: string,
    dateTo: string,
    filters?: Record<string, any>,
  ): Promise<{ data: any[]; summary: Record<string, any> }> {
    const result = await this.dataSource.query(`
      SELECT
        b.id,
        b.lot_number,
        b.material_id,
        b.expiry_date,
        b.quantity_available,
        b.quality_status
      FROM batches b
      WHERE b.expiry_date BETWEEN $1 AND $2
        AND b.quantity_available > 0
      ORDER BY b.expiry_date ASC
    `, [dateFrom, dateTo]);

    return {
      data: result,
      summary: { expiringBatches: result.length },
    };
  }

  private async reorderReport(
    filters?: Record<string, any>,
  ): Promise<{ data: any[]; summary: Record<string, any> }> {
    const result = await this.dataSource.query(`
      SELECT
        m.id,
        m.code,
        m.name_en,
        m.reorder_point,
        m.reorder_quantity,
        COALESCE(SUM(b.quantity_available), 0) as current_stock
      FROM materials m
      LEFT JOIN batches b ON b.material_id = m.id AND b.quantity_available > 0
      GROUP BY m.id, m.code, m.name_en, m.reorder_point, m.reorder_quantity
      HAVING COALESCE(SUM(b.quantity_available), 0) <= m.reorder_point
      ORDER BY current_stock ASC
    `);

    return {
      data: result,
      summary: { materialsToReorder: result.length },
    };
  }

  private async supplierPerformanceReport(
    dateFrom: string,
    dateTo: string,
    filters?: Record<string, any>,
  ): Promise<{ data: any[]; summary: Record<string, any> }> {
    const result = await this.dataSource.query(`
      SELECT
        se.supplier_id,
        AVG(se.on_time_delivery_score) as avg_delivery,
        AVG(se.quality_score) as avg_quality,
        AVG(se.price_stability_score) as avg_price,
        AVG(se.overall_score) as avg_overall,
        COUNT(*) as evaluation_count
      FROM supplier_evaluations se
      WHERE se.evaluation_date BETWEEN $1 AND $2
      GROUP BY se.supplier_id
      ORDER BY avg_overall DESC
    `, [dateFrom, dateTo]);

    return {
      data: result,
      summary: { suppliersEvaluated: result.length },
    };
  }
}
