-- ============================================================================
-- Migration 004: Create Suppliers and Supplier Evaluations Tables
-- KEMYAN Store Management System
-- ============================================================================
-- Suppliers are tracked with GMP+ and FAMI-QS certification details
-- for feed-grade compliance. Periodic evaluations score delivery,
-- quality, and price stability for supplier qualification decisions.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Table: suppliers
-- Master supplier records with certification tracking for GMP+ B2/B3
-- and FAMI-QS schemes. Qualification status gates procurement eligibility.
-- ---------------------------------------------------------------------------
CREATE TABLE suppliers (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code                    VARCHAR(50) UNIQUE NOT NULL,
    name_en                 VARCHAR(200) NOT NULL,
    name_ar                 VARCHAR(200),
    contact_email           VARCHAR(255),
    contact_phone           VARCHAR(50),
    address                 TEXT,
    country                 VARCHAR(100),
    gmp_plus_cert_number    VARCHAR(100),
    gmp_plus_cert_expiry    DATE,
    famiqs_cert_number      VARCHAR(100),
    famiqs_cert_expiry      DATE,
    qualification_status    VARCHAR(30) NOT NULL DEFAULT 'pending',
    performance_score       DECIMAL(5,2),
    is_active               BOOLEAN DEFAULT true,
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Table: supplier_evaluations
-- Periodic performance evaluations scored across multiple dimensions.
-- Links to the evaluating user for accountability.
-- ---------------------------------------------------------------------------
CREATE TABLE supplier_evaluations (
    id                          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    supplier_id                 UUID REFERENCES suppliers(id),
    evaluation_date             DATE NOT NULL,
    on_time_delivery_score      DECIMAL(5,2),
    quality_score               DECIMAL(5,2),
    price_stability_score       DECIMAL(5,2),
    overall_score               DECIMAL(5,2),
    evaluated_by                UUID REFERENCES users(id),
    notes                       TEXT,
    created_at                  TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Indexes for supplier lookups
-- ---------------------------------------------------------------------------
CREATE INDEX idx_suppliers_code ON suppliers(code);
CREATE INDEX idx_suppliers_qualification_status ON suppliers(qualification_status);
CREATE INDEX idx_supplier_evaluations_supplier_id ON supplier_evaluations(supplier_id);
