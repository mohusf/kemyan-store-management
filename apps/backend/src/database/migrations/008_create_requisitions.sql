-- ============================================================================
-- Migration 008: Create Requisitions and Approval Workflow Tables
-- KEMYAN Store Management System
-- ============================================================================
-- Requisitions capture material requests from departments. Approval steps
-- define a multi-level approval chain with SLA tracking and escalation.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Table: requisitions
-- Material requests with urgency levels and value-based routing.
-- status: 'draft', 'pending_approval', 'approved', 'rejected',
--         'partially_fulfilled', 'fulfilled', 'cancelled'
-- urgency: 'low', 'normal', 'high', 'critical'
-- ---------------------------------------------------------------------------
CREATE TABLE requisitions (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requisition_number      VARCHAR(50) UNIQUE NOT NULL,
    requester_id            UUID REFERENCES users(id) NOT NULL,
    material_id             UUID REFERENCES materials(id) NOT NULL,
    quantity                DECIMAL(12,3) NOT NULL,
    urgency                 VARCHAR(20) NOT NULL DEFAULT 'normal',
    estimated_value         DECIMAL(15,2),
    status                  VARCHAR(30) NOT NULL DEFAULT 'draft',
    current_approver_id     UUID REFERENCES users(id),
    department              VARCHAR(100),
    justification           TEXT,
    required_date           DATE,
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Table: approval_steps
-- Ordered approval chain for a requisition. Each step tracks the approver
-- role, actual approver, decision, and SLA compliance.
-- decision: 'pending', 'approved', 'rejected', 'escalated'
-- ---------------------------------------------------------------------------
CREATE TABLE approval_steps (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requisition_id      UUID REFERENCES requisitions(id) ON DELETE CASCADE,
    step_order          INT NOT NULL,
    approver_role       VARCHAR(50) NOT NULL,
    approver_id         UUID REFERENCES users(id),
    decision            VARCHAR(20),
    comments            TEXT,
    decided_at          TIMESTAMPTZ,
    sla_hours           INT DEFAULT 24,
    escalated           BOOLEAN DEFAULT false
);

-- ---------------------------------------------------------------------------
-- Indexes for requisition lookups
-- ---------------------------------------------------------------------------
CREATE INDEX idx_requisitions_status ON requisitions(status);
CREATE INDEX idx_requisitions_requester_id ON requisitions(requester_id);
CREATE INDEX idx_requisitions_current_approver ON requisitions(current_approver_id);
CREATE INDEX idx_approval_steps_requisition_id ON approval_steps(requisition_id);
