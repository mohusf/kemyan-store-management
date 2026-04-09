-- ============================================================================
-- Migration 016: Fix Entity-Migration Alignment
-- KEMYAN Store Management System
-- ============================================================================
-- Reconciles 27 mismatches between TypeORM entity definitions and SQL
-- migration column types. Entity definitions are the intended schema.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Documents module (2 fixes — title column lengths)
-- Entity: varchar(500), Migration 011: VARCHAR(200)
-- ---------------------------------------------------------------------------
ALTER TABLE documents ALTER COLUMN title_en TYPE VARCHAR(500);
ALTER TABLE documents ALTER COLUMN title_ar TYPE VARCHAR(500);

-- ---------------------------------------------------------------------------
-- Materials module (4 fixes — name column lengths)
-- Entity: varchar(255), Migration 003: VARCHAR(200) / VARCHAR(100)
-- ---------------------------------------------------------------------------
ALTER TABLE materials ALTER COLUMN name_en TYPE VARCHAR(255);
ALTER TABLE materials ALTER COLUMN name_ar TYPE VARCHAR(255);
ALTER TABLE material_categories ALTER COLUMN name_en TYPE VARCHAR(255);
ALTER TABLE material_categories ALTER COLUMN name_ar TYPE VARCHAR(255);

-- ---------------------------------------------------------------------------
-- Requisition module (2 fixes — decimal precision, approver_role length)
-- Entity: decimal(14,2), Migration 008: DECIMAL(15,2)
-- Entity: varchar(100), Migration 008: VARCHAR(50)
-- ---------------------------------------------------------------------------
ALTER TABLE requisitions ALTER COLUMN estimated_value TYPE DECIMAL(14,2);
ALTER TABLE approval_steps ALTER COLUMN approver_role TYPE VARCHAR(100);

-- ---------------------------------------------------------------------------
-- Warehouse module (6 fixes — name lengths + decimal precision)
-- Entity: varchar(255), Migration 005: VARCHAR(100)
-- Entity: decimal(12,2), Migration 005: DECIMAL(12,3)
-- ---------------------------------------------------------------------------
ALTER TABLE zones ALTER COLUMN name_en TYPE VARCHAR(255);
ALTER TABLE zones ALTER COLUMN name_ar TYPE VARCHAR(255);
ALTER TABLE storage_locations ALTER COLUMN name_en TYPE VARCHAR(255);
ALTER TABLE storage_locations ALTER COLUMN name_ar TYPE VARCHAR(255);
ALTER TABLE storage_locations ALTER COLUMN max_capacity TYPE DECIMAL(12,2);
ALTER TABLE storage_locations ALTER COLUMN current_occupancy TYPE DECIMAL(12,2);

-- ---------------------------------------------------------------------------
-- Suppliers module (2 fixes — name column lengths)
-- Entity: varchar(255), Migration 004: VARCHAR(200)
-- ---------------------------------------------------------------------------
ALTER TABLE suppliers ALTER COLUMN name_en TYPE VARCHAR(255);
ALTER TABLE suppliers ALTER COLUMN name_ar TYPE VARCHAR(255);

-- ---------------------------------------------------------------------------
-- Quality module (1 fix — NCR title length)
-- Entity: varchar(255), Migration 009: VARCHAR(200)
-- ---------------------------------------------------------------------------
ALTER TABLE ncr ALTER COLUMN title TYPE VARCHAR(255);

-- ---------------------------------------------------------------------------
-- Compliance module (3 fixes — temperature precision + PPE type length)
-- Entity: decimal(5,2), Migration 010: DECIMAL(5,1)
-- Entity: varchar(100), Migration 010: VARCHAR(50)
-- ---------------------------------------------------------------------------
ALTER TABLE sds_records ALTER COLUMN storage_temperature_min TYPE DECIMAL(5,2);
ALTER TABLE sds_records ALTER COLUMN storage_temperature_max TYPE DECIMAL(5,2);
ALTER TABLE ppe_issuances ALTER COLUMN ppe_type TYPE VARCHAR(100);
