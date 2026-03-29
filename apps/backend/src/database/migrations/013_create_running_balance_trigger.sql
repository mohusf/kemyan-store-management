-- ============================================================================
-- Migration 013: Create Running Balance Trigger for Inventory Transactions
-- KEMYAN Store Management System
-- ============================================================================
-- Automatically calculates the running_balance field on each new inventory
-- transaction by summing all prior transaction quantities for the same
-- material_id and adding the current row's quantity. This ensures the
-- running balance is always consistent without application-level logic.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Function: calculate_running_balance
-- Computes the running balance for a material by summing all existing
-- transaction quantities and adding the incoming row's quantity.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION calculate_running_balance()
RETURNS TRIGGER AS $$
DECLARE
    current_balance DECIMAL(12,3);
BEGIN
    -- Acquire advisory lock to prevent concurrent balance calculations for the same material
    PERFORM pg_advisory_xact_lock(hashtext(NEW.material_id::text));

    -- Sum all existing transaction quantities for this material
    SELECT COALESCE(SUM(quantity), 0)
    INTO current_balance
    FROM inventory_transactions
    WHERE material_id = NEW.material_id;

    -- Set the running balance to the cumulative total including this transaction
    NEW.running_balance := current_balance + NEW.quantity;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------------------------
-- Trigger: trg_inventory_running_balance
-- Fires before each INSERT on inventory_transactions to auto-calculate
-- the running balance. This runs before the row is written, so the
-- NEW.running_balance is set correctly before persistence.
-- ---------------------------------------------------------------------------
CREATE TRIGGER trg_inventory_running_balance
    BEFORE INSERT ON inventory_transactions
    FOR EACH ROW
    EXECUTE FUNCTION calculate_running_balance();
