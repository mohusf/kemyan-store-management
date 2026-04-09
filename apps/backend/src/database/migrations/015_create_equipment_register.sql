-- Migration 015: Equipment register tables
-- Supports 259 equipment items across 10 plant units with 44 type codes

-- Equipment type codes (44 codes from numbering WI)
CREATE TABLE IF NOT EXISTS equipment_type_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(5) UNIQUE NOT NULL,
    description_en VARCHAR(200) NOT NULL,
    description_ar VARCHAR(200),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Plant units (U01-U10)
CREATE TABLE IF NOT EXISTS plant_units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_code VARCHAR(5) UNIQUE NOT NULL,
    name_en VARCHAR(200) NOT NULL,
    name_ar VARCHAR(200),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Equipment register (259 items)
CREATE TABLE IF NOT EXISTS equipment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tag_number VARCHAR(50) UNIQUE NOT NULL,
    plant_unit_id UUID NOT NULL REFERENCES plant_units(id),
    equipment_type_code_id UUID NOT NULL REFERENCES equipment_type_codes(id),
    sequential_number INTEGER NOT NULL,
    suffix VARCHAR(10),
    description_en VARCHAR(500) NOT NULL,
    description_ar VARCHAR(500),
    location VARCHAR(200),
    criticality_class VARCHAR(5),
    pm_strategy VARCHAR(20),
    associated_pm_wis TEXT,
    serial_number VARCHAR(100),
    status VARCHAR(30) DEFAULT 'active',
    manufacturer VARCHAR(200),
    model VARCHAR(200),
    specifications JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_equipment_plant_unit ON equipment(plant_unit_id);
CREATE INDEX IF NOT EXISTS idx_equipment_type_code ON equipment(equipment_type_code_id);
CREATE INDEX IF NOT EXISTS idx_equipment_status ON equipment(status);
CREATE INDEX IF NOT EXISTS idx_equipment_criticality ON equipment(criticality_class);
