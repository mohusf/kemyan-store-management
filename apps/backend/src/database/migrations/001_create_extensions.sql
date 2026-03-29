-- ============================================================================
-- Migration 001: Enable Required PostgreSQL Extensions
-- KEMYAN Store Management System
-- ============================================================================
-- uuid-ossp: Provides UUID generation functions (uuid_generate_v4)
-- pgcrypto:  Provides cryptographic functions (gen_random_bytes, crypt, etc.)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
