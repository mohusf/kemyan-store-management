-- ============================================================================
-- Migration 006: Create Inventory (Batches and Transactions) Tables
-- KEMYAN Store Management System
-- ============================================================================
-- Batches represent discrete lots of material with full traceability back
-- to supplier, production order, and raw material inputs. Inventory
-- transactions form an APPEND-ONLY ledger for complete audit trail.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Table: batches
-- Each batch tracks a specific lot of material through its lifecycle.
-- quality_status: 'quarantine', 'approved', 'rejected', 'expired'
-- gmp_plus_status: 'assured', 'non_assured'
-- raw_material_batches: array of source batch UUIDs for finished goods.
-- ---------------------------------------------------------------------------
CREATE TABLE batches (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    material_id             UUID REFERENCES materials(id) NOT NULL,
    lot_number              VARCHAR(50) UNIQUE NOT NULL,
    supplier_id             UUID REFERENCES suppliers(id),
    supplier_batch_number   VARCHAR(100),
    manufacture_date        DATE,
    expiry_date             DATE,
    received_date           DATE,
    quantity_received       DECIMAL(12,3) NOT NULL,
    quantity_available      DECIMAL(12,3) NOT NULL,
    quality_status          VARCHAR(30) NOT NULL DEFAULT 'quarantine',
    gmp_plus_status         VARCHAR(20) DEFAULT 'non_assured',
    coa_document_id         UUID,
    storage_location_id     UUID REFERENCES storage_locations(id),
    raw_material_batches    UUID[],
    production_order_id     VARCHAR(50),
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Enum: transaction_type_enum
-- Defines the allowed inventory movement types.
-- ---------------------------------------------------------------------------
CREATE TYPE transaction_type_enum AS ENUM (
    'receive',
    'issue',
    'transfer',
    'adjust',
    'return',
    'write_off'
);

-- ---------------------------------------------------------------------------
-- Table: inventory_transactions
-- APPEND-ONLY ledger of all inventory movements. Each row records a
-- quantity change with a running balance for that material. Rules prevent
-- any UPDATE or DELETE to preserve the integrity of the audit trail.
-- ---------------------------------------------------------------------------
CREATE TABLE inventory_transactions (
    id                  BIGSERIAL PRIMARY KEY,
    batch_id            UUID REFERENCES batches(id),
    material_id         UUID REFERENCES materials(id) NOT NULL,
    location_id         UUID REFERENCES storage_locations(id),
    transaction_type    transaction_type_enum NOT NULL,
    quantity            DECIMAL(12,3) NOT NULL,
    reference_type      VARCHAR(50),
    reference_id        UUID,
    performed_by        UUID REFERENCES users(id) NOT NULL,
    reason              TEXT,
    running_balance     DECIMAL(12,3) NOT NULL,
    created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Append-only enforcement: prevent UPDATE and DELETE on the ledger.
-- These rules silently discard any attempt to modify or remove rows.
-- ---------------------------------------------------------------------------
COMMENT ON TABLE inventory_transactions IS
    'Append-only inventory ledger. UPDATE and DELETE operations are blocked by rules.';

CREATE RULE no_update_inventory AS ON UPDATE TO inventory_transactions DO INSTEAD NOTHING;
CREATE RULE no_delete_inventory AS ON DELETE TO inventory_transactions DO INSTEAD NOTHING;

-- ---------------------------------------------------------------------------
-- Indexes for batch and transaction lookups
-- ---------------------------------------------------------------------------
CREATE INDEX idx_batches_material_quality ON batches(material_id, quality_status);
CREATE INDEX idx_batches_expiry_date ON batches(expiry_date);
CREATE INDEX idx_batches_lot_number ON batches(lot_number);

CREATE INDEX idx_inv_txn_material_created ON inventory_transactions(material_id, created_at);
CREATE INDEX idx_inv_txn_batch_id ON inventory_transactions(batch_id);
CREATE INDEX idx_inv_txn_reference ON inventory_transactions(reference_type, reference_id);
