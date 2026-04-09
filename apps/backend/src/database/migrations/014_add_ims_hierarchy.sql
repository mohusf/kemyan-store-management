-- Migration 014: Add IMS hierarchy columns to documents + section/revision tables
-- Supports 83 documents across 5 domains (IMS/GMP/QLY/ENV/OHS), 6 type codes, 4 levels

-- New columns on documents table
ALTER TABLE documents ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES documents(id) ON DELETE SET NULL;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS document_level VARCHAR(5);
ALTER TABLE documents ADD COLUMN IF NOT EXISTS type_code VARCHAR(5);
ALTER TABLE documents ADD COLUMN IF NOT EXISTS chapter INTEGER;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS domain VARCHAR(10);
ALTER TABLE documents ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_documents_parent_id ON documents(parent_id);
CREATE INDEX IF NOT EXISTS idx_documents_level ON documents(document_level);
CREATE INDEX IF NOT EXISTS idx_documents_type_code ON documents(type_code);
CREATE INDEX IF NOT EXISTS idx_documents_chapter ON documents(chapter);
CREATE INDEX IF NOT EXISTS idx_documents_domain ON documents(domain);

-- Document sections (structured content blocks)
CREATE TABLE IF NOT EXISTS document_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    section_number VARCHAR(20) NOT NULL,
    title_en VARCHAR(500) NOT NULL,
    title_ar VARCHAR(500),
    content_en TEXT,
    content_ar TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_doc_sections_document_id ON document_sections(document_id);

-- Document revision register
CREATE TABLE IF NOT EXISTS document_revisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    revision_index INTEGER NOT NULL,
    description TEXT,
    revision_date DATE,
    prepared_by VARCHAR(200),
    reviewed_by VARCHAR(200),
    approved_by VARCHAR(200),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_doc_revisions_document_id ON document_revisions(document_id);
