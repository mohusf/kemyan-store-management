-- ============================================================================
-- Migration 009: Create Quality Management Tables
-- KEMYAN Store Management System
-- ============================================================================
-- Inspections record quality checks on batches. Certificates of Analysis
-- (CoA) store supplier-provided analytical data. Non-Conformance Reports
-- (NCR) track deviations with root cause analysis and CAPA workflow.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Table: inspections
-- Quality inspections performed on received or in-process batches.
-- inspection_type: 'incoming', 'in_process', 'final', 'periodic'
-- result: 'pass', 'fail', 'conditional'
-- ---------------------------------------------------------------------------
CREATE TABLE inspections (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id            UUID REFERENCES batches(id) NOT NULL,
    inspection_type     VARCHAR(50) NOT NULL,
    inspector_id        UUID REFERENCES users(id) NOT NULL,
    result              VARCHAR(20) NOT NULL,
    parameters          JSONB,
    coa_document_id     UUID,
    inspected_at        TIMESTAMPTZ DEFAULT NOW(),
    notes               TEXT
);

-- ---------------------------------------------------------------------------
-- Table: certificates_of_analysis
-- Supplier-provided CoA documents with analytical parameters.
-- Verification by quality personnel ensures data integrity.
-- ---------------------------------------------------------------------------
CREATE TABLE certificates_of_analysis (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id        UUID REFERENCES batches(id) NOT NULL,
    supplier_id     UUID REFERENCES suppliers(id),
    document_url    TEXT,
    parameters      JSONB,
    issued_at       DATE,
    verified_by     UUID REFERENCES users(id),
    verified_at     TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Table: non_conformance_reports
-- NCRs track quality deviations, root cause analysis, corrective and
-- preventive actions (CAPA) per ISO 9001:2015 Clause 10.2.
-- severity: 'minor', 'major', 'critical'
-- status: 'open', 'investigating', 'corrective_action', 'closed', 'verified'
-- source: 'incoming_inspection', 'in_process', 'customer_complaint',
--         'internal_audit', 'supplier_issue'
-- ---------------------------------------------------------------------------
CREATE TABLE non_conformance_reports (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ncr_number          VARCHAR(50) UNIQUE NOT NULL,
    title               VARCHAR(200) NOT NULL,
    description         TEXT,
    source              VARCHAR(50),
    severity            VARCHAR(20) NOT NULL,
    batch_id            UUID REFERENCES batches(id),
    material_id         UUID REFERENCES materials(id),
    status              VARCHAR(30) NOT NULL DEFAULT 'open',
    assigned_to         UUID REFERENCES users(id),
    root_cause          TEXT,
    corrective_action   TEXT,
    preventive_action   TEXT,
    due_date            DATE,
    created_by          UUID REFERENCES users(id),
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    closed_at           TIMESTAMPTZ,
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Indexes for quality lookups
-- ---------------------------------------------------------------------------
CREATE INDEX idx_inspections_batch_id ON inspections(batch_id);
CREATE INDEX idx_inspections_result ON inspections(result);
CREATE INDEX idx_coa_batch_id ON certificates_of_analysis(batch_id);
CREATE INDEX idx_ncr_status ON non_conformance_reports(status);
CREATE INDEX idx_ncr_severity ON non_conformance_reports(severity);
CREATE INDEX idx_ncr_batch_id ON non_conformance_reports(batch_id);
CREATE INDEX idx_ncr_assigned_to ON non_conformance_reports(assigned_to);
