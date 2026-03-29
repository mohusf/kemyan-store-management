-- ============================================================================
-- Migration 005: Create Warehouse Zones and Storage Locations Tables
-- KEMYAN Store Management System
-- ============================================================================
-- Zones represent physical warehouse areas with chemical compatibility
-- constraints and environmental limits. Storage locations are individual
-- addressable positions (aisle/rack/bin) within zones, each with their
-- own capacity tracking and PPE requirements.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Table: zones
-- Physical warehouse zones with chemical compatibility groups.
-- zone_type examples: 'raw_material', 'finished_goods', 'quarantine',
--                     'hazardous', 'cold_storage'
-- ---------------------------------------------------------------------------
CREATE TABLE zones (
    id                          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code                        VARCHAR(20) UNIQUE NOT NULL,
    name_en                     VARCHAR(100) NOT NULL,
    name_ar                     VARCHAR(100),
    zone_type                   VARCHAR(30) NOT NULL,
    allowed_compatibility_groups JSONB NOT NULL DEFAULT '[]',
    safety_equipment            JSONB,
    max_temperature             DECIMAL(5,1),
    max_humidity                DECIMAL(5,1),
    is_active                   BOOLEAN DEFAULT true,
    created_at                  TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Table: storage_locations
-- Individual addressable positions within a zone (aisle/rack/bin).
-- Tracks real-time capacity and environmental constraints.
-- ---------------------------------------------------------------------------
CREATE TABLE storage_locations (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code                VARCHAR(50) UNIQUE NOT NULL,
    name_en             VARCHAR(100),
    name_ar             VARCHAR(100),
    zone_id             UUID REFERENCES zones(id),
    aisle               VARCHAR(10),
    rack                VARCHAR(10),
    bin                 VARCHAR(10),
    location_type       VARCHAR(30) NOT NULL,
    compatibility_groups JSONB NOT NULL DEFAULT '[]',
    max_capacity        DECIMAL(12,3),
    current_occupancy   DECIMAL(12,3) DEFAULT 0,
    temperature_min     DECIMAL(5,1),
    temperature_max     DECIMAL(5,1),
    humidity_max        DECIMAL(5,1),
    required_ppe        JSONB,
    is_active           BOOLEAN DEFAULT true,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Indexes for warehouse lookups
-- ---------------------------------------------------------------------------
CREATE INDEX idx_zones_code ON zones(code);
CREATE INDEX idx_zones_zone_type ON zones(zone_type);
CREATE INDEX idx_storage_locations_code ON storage_locations(code);
CREATE INDEX idx_storage_locations_zone_id ON storage_locations(zone_id);
CREATE INDEX idx_storage_locations_location_type ON storage_locations(location_type);
