-- ============================================================================
-- Migration 002: Create Users and Roles Tables
-- KEMYAN Store Management System
-- ============================================================================
-- Roles define permission sets for access control across the system.
-- Users are authenticated personnel with bilingual name support (EN/AR).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Table: roles
-- Stores role definitions with JSONB permission arrays for flexible RBAC.
-- ---------------------------------------------------------------------------
CREATE TABLE roles (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(50) UNIQUE NOT NULL,
    permissions     JSONB NOT NULL DEFAULT '[]',
    description_en  TEXT,
    description_ar  TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Table: users
-- Core user accounts with bilingual names and department assignment.
-- ---------------------------------------------------------------------------
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    name_en         VARCHAR(100) NOT NULL,
    name_ar         VARCHAR(100),
    role_id         UUID REFERENCES roles(id),
    department      VARCHAR(100),
    is_active       BOOLEAN DEFAULT true,
    last_login_at   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Indexes for efficient lookups on users
-- ---------------------------------------------------------------------------
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_users_department ON users(department);
