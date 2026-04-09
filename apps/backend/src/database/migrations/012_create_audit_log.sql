-- ============================================================================
-- Migration 012: Create Immutable Audit Log Table
-- KEMYAN Store Management System
-- ============================================================================
-- Append-only audit trail with SHA-256 hash chaining for tamper detection.
-- Complies with ISO 9001:2015 Clause 7.5 (documented information) and
-- supports regulatory audit requirements for GMP+ and FAMI-QS.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Table: audit_logs
-- Every significant data change is recorded here with before/after snapshots.
-- hash_chain links each entry to the previous via SHA-256 digest, making
-- any tampering or deletion detectable.
-- ---------------------------------------------------------------------------
CREATE TABLE audit_logs (
    id              BIGSERIAL PRIMARY KEY,
    entity_type     VARCHAR(100) NOT NULL,
    entity_id       VARCHAR(100) NOT NULL,
    action          VARCHAR(50) NOT NULL,
    previous_data   JSONB,
    new_data        JSONB,
    performed_by    UUID REFERENCES users(id),
    ip_address      INET,
    user_agent      TEXT,
    hash_chain      VARCHAR(64),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE audit_logs IS
    'Immutable audit trail with SHA-256 hash chaining for ISO 9001:2015 Clause 7.5 compliance';

-- ---------------------------------------------------------------------------
-- Append-only enforcement: prevent UPDATE and DELETE on the audit log.
-- These rules silently discard any attempt to modify or remove rows,
-- preserving the integrity of the audit chain.
-- ---------------------------------------------------------------------------
CREATE RULE no_update_audit_logs AS ON UPDATE TO audit_logs DO INSTEAD NOTHING;
CREATE RULE no_delete_audit_logs AS ON DELETE TO audit_logs DO INSTEAD NOTHING;

-- ---------------------------------------------------------------------------
-- Indexes for audit log queries
-- ---------------------------------------------------------------------------
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_performed_by ON audit_logs(performed_by);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- ---------------------------------------------------------------------------
-- Trigger function: compute_audit_hash_chain
-- Before each INSERT, computes a SHA-256 hash of the previous row's hash
-- concatenated with the current row's data, forming an unbroken chain.
-- If no previous row exists (first entry), hashes only the current data.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION compute_audit_hash_chain()
RETURNS TRIGGER AS $$
DECLARE
    prev_hash VARCHAR(64);
    row_data  TEXT;
BEGIN
    -- Retrieve the hash of the most recent audit log entry
    SELECT hash_chain INTO prev_hash
    FROM audit_logs
    ORDER BY id DESC
    LIMIT 1
    FOR UPDATE;

    -- Build a string representation of the current row's key fields
    row_data := COALESCE(NEW.entity_type, '') || '|' ||
                COALESCE(NEW.entity_id, '') || '|' ||
                COALESCE(NEW.action, '') || '|' ||
                COALESCE(NEW.previous_data::TEXT, '') || '|' ||
                COALESCE(NEW.new_data::TEXT, '') || '|' ||
                COALESCE(NEW.performed_by::TEXT, '') || '|' ||
                COALESCE(NEW.created_at::TEXT, NOW()::TEXT);

    -- Compute SHA-256: chain = hash(previous_hash + current_data)
    IF prev_hash IS NOT NULL THEN
        NEW.hash_chain := encode(digest(prev_hash || row_data, 'sha256'), 'hex');
    ELSE
        -- First entry in the audit log: hash only the current data
        NEW.hash_chain := encode(digest(row_data, 'sha256'), 'hex');
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------------------------
-- Trigger: trg_audit_hash_chain
-- Fires before each INSERT to compute the hash chain value.
-- ---------------------------------------------------------------------------
CREATE TRIGGER trg_audit_hash_chain
    BEFORE INSERT ON audit_logs
    FOR EACH ROW
    EXECUTE FUNCTION compute_audit_hash_chain();
