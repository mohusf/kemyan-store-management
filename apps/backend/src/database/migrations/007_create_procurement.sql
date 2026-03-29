-- ============================================================================
-- Migration 007: Create Procurement Tables
-- KEMYAN Store Management System
-- ============================================================================
-- Purchase orders, their line items, goods received notes (GRN), and
-- GRN line items form the procurement workflow. Supports ZATCA e-invoicing
-- references and SAR currency for Saudi Arabia compliance.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Table: purchase_orders
-- Header-level purchase order with approval tracking and ZATCA integration.
-- status: 'draft', 'pending_approval', 'approved', 'sent', 'partially_received',
--         'fully_received', 'cancelled'
-- ---------------------------------------------------------------------------
CREATE TABLE purchase_orders (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    po_number       VARCHAR(50) UNIQUE NOT NULL,
    supplier_id     UUID REFERENCES suppliers(id) NOT NULL,
    status          VARCHAR(30) NOT NULL DEFAULT 'draft',
    total_amount    DECIMAL(15,2),
    vat_amount      DECIMAL(15,2),
    currency        VARCHAR(3) DEFAULT 'SAR',
    zatca_invoice_id VARCHAR(100),
    notes           TEXT,
    created_by      UUID REFERENCES users(id),
    approved_by     UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Table: purchase_order_lines
-- Individual line items on a purchase order, linked to materials.
-- Tracks received quantity against ordered quantity.
-- ---------------------------------------------------------------------------
CREATE TABLE purchase_order_lines (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    purchase_order_id   UUID REFERENCES purchase_orders(id) ON DELETE CASCADE,
    material_id         UUID REFERENCES materials(id) NOT NULL,
    quantity            DECIMAL(12,3) NOT NULL,
    unit_price          DECIMAL(15,4) NOT NULL,
    total_price         DECIMAL(15,2) NOT NULL,
    received_quantity   DECIMAL(12,3) DEFAULT 0,
    notes               TEXT
);

-- ---------------------------------------------------------------------------
-- Table: goods_received_notes
-- Records the physical receipt of goods against a purchase order.
-- inspection_status: 'pending', 'passed', 'failed', 'partial'
-- ---------------------------------------------------------------------------
CREATE TABLE goods_received_notes (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    grn_number          VARCHAR(50) UNIQUE NOT NULL,
    purchase_order_id   UUID REFERENCES purchase_orders(id),
    received_by         UUID REFERENCES users(id) NOT NULL,
    received_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    inspection_status   VARCHAR(30) DEFAULT 'pending',
    notes               TEXT,
    created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Table: grn_lines
-- Line-level detail for each GRN, linking to PO lines and creating batches.
-- Tracks accepted vs. rejected quantities with rejection reasons.
-- ---------------------------------------------------------------------------
CREATE TABLE grn_lines (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    grn_id              UUID REFERENCES goods_received_notes(id) ON DELETE CASCADE,
    po_line_id          UUID REFERENCES purchase_order_lines(id),
    material_id         UUID REFERENCES materials(id) NOT NULL,
    batch_id            UUID REFERENCES batches(id),
    quantity_received   DECIMAL(12,3) NOT NULL,
    quantity_accepted   DECIMAL(12,3),
    quantity_rejected   DECIMAL(12,3) DEFAULT 0,
    rejection_reason    TEXT
);

-- ---------------------------------------------------------------------------
-- Indexes for procurement lookups
-- ---------------------------------------------------------------------------
CREATE INDEX idx_po_supplier_id ON purchase_orders(supplier_id);
CREATE INDEX idx_po_status ON purchase_orders(status);
CREATE INDEX idx_po_lines_po_id ON purchase_order_lines(purchase_order_id);
CREATE INDEX idx_grn_po_id ON goods_received_notes(purchase_order_id);
CREATE INDEX idx_grn_lines_grn_id ON grn_lines(grn_id);
