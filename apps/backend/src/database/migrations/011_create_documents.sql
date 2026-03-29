-- ============================================================================
-- Migration 011: Create Document Management Tables
-- KEMYAN Store Management System
-- ============================================================================
-- Centralized document management for SOPs, policies, certificates, and
-- other controlled documents. Acknowledgments track user confirmation
-- of document review per ISO 9001:2015 Clause 7.5.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Table: documents
-- Controlled documents with versioning and review cycle tracking.
-- category: 'sop', 'policy', 'certificate', 'sds', 'coa', 'report',
--           'training', 'form', 'other'
-- status: 'draft', 'under_review', 'approved', 'obsolete'
-- ---------------------------------------------------------------------------
CREATE TABLE documents (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_number     VARCHAR(50) UNIQUE NOT NULL,
    title_en            VARCHAR(200) NOT NULL,
    title_ar            VARCHAR(200),
    category            VARCHAR(50) NOT NULL,
    version             VARCHAR(20) NOT NULL DEFAULT '1.0',
    status              VARCHAR(30) NOT NULL DEFAULT 'draft',
    file_path           TEXT,
    file_size_bytes     BIGINT,
    mime_type           VARCHAR(100),
    uploaded_by         UUID REFERENCES users(id),
    effective_date      DATE,
    review_date         DATE,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Table: document_acknowledgments
-- Records that a user has reviewed and acknowledged a document.
-- Each user can only acknowledge a document once (enforced by UNIQUE).
-- ---------------------------------------------------------------------------
CREATE TABLE document_acknowledgments (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id         UUID REFERENCES documents(id) ON DELETE CASCADE,
    user_id             UUID REFERENCES users(id) NOT NULL,
    acknowledged_at     TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(document_id, user_id)
);

-- ---------------------------------------------------------------------------
-- Indexes for document lookups
-- ---------------------------------------------------------------------------
CREATE INDEX idx_documents_category ON documents(category);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_review_date ON documents(review_date);
CREATE INDEX idx_doc_ack_document_id ON document_acknowledgments(document_id);
CREATE INDEX idx_doc_ack_user_id ON document_acknowledgments(user_id);
