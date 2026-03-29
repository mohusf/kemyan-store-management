-- ============================================================================
-- Migration 003: Create Materials and Material Categories Tables
-- KEMYAN Store Management System
-- ============================================================================
-- Material categories support hierarchical classification via parent_id.
-- Materials track chemical/feed-grade properties, GHS classification,
-- reorder parameters, and shelf-life requirements for KEMYAN operations.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Table: material_categories
-- Hierarchical categories with self-referencing parent for nesting.
-- Some categories require quality approval before materials can be used.
-- ---------------------------------------------------------------------------
CREATE TABLE material_categories (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en                 VARCHAR(100),
    name_ar                 VARCHAR(100),
    parent_id               UUID REFERENCES material_categories(id),
    requires_quality_approval BOOLEAN DEFAULT false,
    created_at              TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Table: materials
-- Master data for raw materials, intermediates, and finished products.
-- Includes GHS hazard classification (JSONB), feed-grade flag for
-- GMP+ compliance, and SDS document linkage.
-- ---------------------------------------------------------------------------
CREATE TABLE materials (
    id                          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code                        VARCHAR(50) UNIQUE NOT NULL,
    name_en                     VARCHAR(200) NOT NULL,
    name_ar                     VARCHAR(200),
    category_id                 UUID REFERENCES material_categories(id),
    unit_of_measure             VARCHAR(20) NOT NULL,
    ghs_classification          JSONB,
    reorder_point               DECIMAL(12,3),
    reorder_quantity            DECIMAL(12,3),
    minimum_shelf_life_percent  DECIMAL(5,2),
    is_feed_grade               BOOLEAN DEFAULT false,
    sds_document_id             UUID,
    specifications              JSONB,
    is_active                   BOOLEAN DEFAULT true,
    created_at                  TIMESTAMPTZ DEFAULT NOW(),
    updated_at                  TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Indexes for efficient material lookups
-- ---------------------------------------------------------------------------
CREATE INDEX idx_materials_code ON materials(code);
CREATE INDEX idx_materials_category_id ON materials(category_id);
CREATE INDEX idx_materials_is_feed_grade ON materials(is_feed_grade);
