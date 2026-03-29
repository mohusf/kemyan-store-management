-- ============================================================================
-- Migration 010: Create Compliance Tables (SDS, Waste, PPE)
-- KEMYAN Store Management System
-- ============================================================================
-- Safety Data Sheets (SDS) store GHS hazard information per material version.
-- Waste records track disposal for Royal Commission Jubail & Yanbu (RCJY)
-- reporting. PPE issuances log personal protective equipment distribution.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Table: sds_records
-- Versioned Safety Data Sheets with GHS classification data.
-- Stores pictograms, H-statements (hazard), P-statements (precautionary),
-- storage conditions, and incompatibility information.
-- signal_word: 'Danger', 'Warning', or NULL
-- ---------------------------------------------------------------------------
CREATE TABLE sds_records (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    material_id             UUID REFERENCES materials(id) NOT NULL,
    version                 VARCHAR(20) NOT NULL,
    signal_word             VARCHAR(20),
    pictograms              JSONB NOT NULL DEFAULT '[]',
    h_statements            JSONB NOT NULL DEFAULT '[]',
    p_statements            JSONB NOT NULL DEFAULT '[]',
    storage_temperature_min DECIMAL(5,1),
    storage_temperature_max DECIMAL(5,1),
    incompatible_materials  JSONB DEFAULT '[]',
    required_ppe            JSONB DEFAULT '[]',
    effective_date          DATE NOT NULL,
    superseded_date         DATE,
    document_url            TEXT,
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW(),

    -- Only one version of an SDS per material at a time
    UNIQUE(material_id, version)
);

-- ---------------------------------------------------------------------------
-- Table: waste_records
-- Tracks hazardous and non-hazardous waste disposal for environmental
-- compliance. Supports RCJY reporting references and transport documentation.
-- waste_type: 'hazardous', 'non_hazardous', 'recyclable', 'chemical'
-- ---------------------------------------------------------------------------
CREATE TABLE waste_records (
    id                          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    material_id                 UUID REFERENCES materials(id),
    batch_id                    UUID REFERENCES batches(id),
    waste_type                  VARCHAR(50) NOT NULL,
    quantity                    DECIMAL(12,3) NOT NULL,
    unit                        VARCHAR(20) NOT NULL,
    disposal_method             VARCHAR(100),
    disposed_by                 UUID REFERENCES users(id),
    disposed_at                 TIMESTAMPTZ,
    transport_document_number   VARCHAR(100),
    rcjy_report_ref            VARCHAR(100),
    notes                       TEXT,
    created_at                  TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Table: ppe_issuances
-- Logs PPE distribution to personnel and tracks returns.
-- ppe_type: 'gloves', 'goggles', 'face_shield', 'respirator',
--           'chemical_suit', 'safety_boots', 'hard_hat'
-- condition_on_return: 'good', 'damaged', 'disposed'
-- ---------------------------------------------------------------------------
CREATE TABLE ppe_issuances (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID REFERENCES users(id) NOT NULL,
    ppe_type            VARCHAR(50) NOT NULL,
    issued_at           TIMESTAMPTZ DEFAULT NOW(),
    returned_at         TIMESTAMPTZ,
    condition_on_return VARCHAR(30),
    notes               TEXT
);

-- ---------------------------------------------------------------------------
-- Indexes for compliance lookups
-- ---------------------------------------------------------------------------
CREATE INDEX idx_sds_material_id ON sds_records(material_id);
CREATE INDEX idx_sds_effective_date ON sds_records(effective_date);
CREATE INDEX idx_waste_material_id ON waste_records(material_id);
CREATE INDEX idx_waste_disposed_at ON waste_records(disposed_at);
CREATE INDEX idx_ppe_user_id ON ppe_issuances(user_id);
CREATE INDEX idx_ppe_issued_at ON ppe_issuances(issued_at);
