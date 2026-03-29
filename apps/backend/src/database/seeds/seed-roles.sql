-- ============================================================================
-- Seed: Predefined Roles for KEMYAN Store Management System
-- ============================================================================
-- 10 roles covering all operational functions from plant floor to
-- system administration. Permissions are stored as JSONB arrays for
-- flexible, fine-grained access control.
-- ============================================================================

INSERT INTO roles (name, permissions, description_en, description_ar) VALUES

-- ---------------------------------------------------------------------------
-- Maintenance & Production Roles
-- ---------------------------------------------------------------------------
('MAINTENANCE_TECHNICIAN',
 '["equipment:read", "equipment:update", "inventory:read", "requisitions:create", "requisitions:read"]',
 'Maintains plant equipment and can request spare parts or materials',
 'فني صيانة المعدات وطلب قطع الغيار'),

('PRODUCTION_OPERATOR',
 '["inventory:read", "batches:read", "requisitions:create", "requisitions:read", "quality:read"]',
 'Operates production lines; can view inventory and raise material requests',
 'مشغل الإنتاج - عرض المخزون وطلب المواد'),

('SUPERVISOR',
 '["inventory:read", "batches:read", "requisitions:create", "requisitions:read", "requisitions:approve", "quality:read", "reports:read"]',
 'Supervises production or warehouse teams; can approve low-value requisitions',
 'مشرف - الموافقة على الطلبات منخفضة القيمة'),

-- ---------------------------------------------------------------------------
-- Warehouse Roles
-- ---------------------------------------------------------------------------
('STORE_KEEPER',
 '["inventory:read", "inventory:create", "inventory:update", "batches:read", "batches:create", "batches:update", "warehouse:read", "warehouse:update", "grn:create", "grn:read"]',
 'Manages day-to-day warehouse operations: receiving, issuing, and stock movements',
 'أمين المستودع - استلام وصرف وحركة المخزون'),

('STORE_MANAGER',
 '["inventory:*", "batches:*", "warehouse:*", "grn:*", "requisitions:read", "requisitions:approve", "suppliers:read", "reports:read", "reports:create"]',
 'Full warehouse authority including stock adjustments, transfers, and reporting',
 'مدير المستودعات - صلاحيات كاملة للمخزون والتقارير'),

-- ---------------------------------------------------------------------------
-- Quality Role
-- ---------------------------------------------------------------------------
('QUALITY_MANAGER',
 '["quality:*", "inspections:*", "ncr:*", "coa:*", "batches:read", "batches:update", "sds:*", "documents:*", "compliance:*"]',
 'Manages quality inspections, NCRs, CoA verification, and SDS compliance',
 'مدير الجودة - الفحوصات وعدم المطابقة وشهادات التحليل'),

-- ---------------------------------------------------------------------------
-- Procurement Roles
-- ---------------------------------------------------------------------------
('PROCUREMENT_OFFICER',
 '["procurement:read", "procurement:create", "suppliers:read", "requisitions:read", "inventory:read", "purchase_orders:create", "purchase_orders:read"]',
 'Creates purchase orders and manages day-to-day procurement activities',
 'موظف المشتريات - إنشاء أوامر الشراء'),

('PROCUREMENT_MANAGER',
 '["procurement:*", "suppliers:*", "purchase_orders:*", "requisitions:read", "requisitions:approve", "inventory:read", "reports:read", "reports:create"]',
 'Full procurement authority including supplier management and PO approval',
 'مدير المشتريات - صلاحيات كاملة للموردين وأوامر الشراء'),

-- ---------------------------------------------------------------------------
-- Management & Administration Roles
-- ---------------------------------------------------------------------------
('PLANT_MANAGER',
 '["inventory:read", "batches:read", "procurement:read", "requisitions:read", "requisitions:approve", "quality:read", "compliance:read", "reports:*", "suppliers:read", "dashboard:*"]',
 'Plant-wide oversight with approval authority for high-value requisitions',
 'مدير المصنع - إشراف شامل والموافقة على الطلبات عالية القيمة'),

('SYSTEM_ADMIN',
 '["*"]',
 'Full system access: user management, configuration, and all modules',
 'مسؤول النظام - صلاحيات كاملة لجميع الوحدات');
