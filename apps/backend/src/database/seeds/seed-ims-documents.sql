-- Seed: IMS Documents (83 documents from Master List IMSFO02001)
-- Single Source of Truth: Master List of Controlled Documents (IMS-FO-02-001)
-- Domains: IMS(50), GMP(17), QLY(8), ENV(4), OHS(4)
-- Parent-child relationships ONLY for maintenance docs (ch 09-15)
-- Non-maintenance docs inserted flat (parent_id=NULL, document_level=NULL)

DO $$
DECLARE
    v_uploaded_by UUID;
BEGIN
    SELECT id INTO v_uploaded_by FROM users LIMIT 1;
    IF v_uploaded_by IS NULL THEN
        v_uploaded_by := uuid_generate_v4();
    END IF;

    -- =====================================================
    -- CHAPTER 01: Context of the Organization (2 docs)
    -- =====================================================
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, sort_order)
    VALUES
        (uuid_generate_v4(), 'IMS-MA-01-001', 'Integrated Management System Manual', 'دليل نظام الإدارة المتكامل', 'procedure', '4.0', 'active', '/docs/ims/IMS-MA-01-001.pdf', v_uploaded_by, 'MA', 1, 'IMS', 1),
        (uuid_generate_v4(), 'IMS-PS-01-001', 'Context of the Organization Process', 'عملية سياق المنظمة', 'procedure', '2.0', 'active', '/docs/ims/IMS-PS-01-001.pdf', v_uploaded_by, 'PS', 1, 'IMS', 2)
    ON CONFLICT (document_number) DO NOTHING;

    -- =====================================================
    -- CHAPTER 02: Document Control (4 docs)
    -- =====================================================
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, sort_order)
    VALUES
        (uuid_generate_v4(), 'IMS-PR-02-001', 'Document Control Procedure', 'إجراء ضبط الوثائق', 'procedure', '3.0', 'active', '/docs/ims/IMS-PR-02-001.pdf', v_uploaded_by, 'PR', 2, 'IMS', 10),
        (uuid_generate_v4(), 'IMS-FO-02-001', 'Master List of Controlled Documents', 'القائمة الرئيسية للوثائق المضبوطة', 'form', '3.0', 'active', '/docs/ims/IMS-FO-02-001.pdf', v_uploaded_by, 'FO', 2, 'IMS', 11),
        (uuid_generate_v4(), 'IMS-FO-02-002', 'Document Change Request Form', 'نموذج طلب تغيير الوثيقة', 'form', '2.0', 'active', '/docs/ims/IMS-FO-02-002.pdf', v_uploaded_by, 'FO', 2, 'IMS', 12),
        (uuid_generate_v4(), 'IMS-FO-02-003', 'Document Distribution List', 'قائمة توزيع الوثائق', 'form', '2.0', 'active', '/docs/ims/IMS-FO-02-003.pdf', v_uploaded_by, 'FO', 2, 'IMS', 13)
    ON CONFLICT (document_number) DO NOTHING;

    -- =====================================================
    -- CHAPTER 03: Leadership & Policy (3 docs)
    -- =====================================================
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, sort_order)
    VALUES
        (uuid_generate_v4(), 'IMS-PS-03-001', 'Leadership and Commitment Process', 'عملية القيادة والالتزام', 'procedure', '2.0', 'active', '/docs/ims/IMS-PS-03-001.pdf', v_uploaded_by, 'PS', 3, 'IMS', 20),
        (uuid_generate_v4(), 'IMS-PR-03-001', 'Management Review Procedure', 'إجراء مراجعة الإدارة', 'procedure', '3.0', 'active', '/docs/ims/IMS-PR-03-001.pdf', v_uploaded_by, 'PR', 3, 'IMS', 21),
        (uuid_generate_v4(), 'IMS-FO-03-001', 'Management Review Minutes Form', 'نموذج محضر مراجعة الإدارة', 'form', '2.0', 'active', '/docs/ims/IMS-FO-03-001.pdf', v_uploaded_by, 'FO', 3, 'IMS', 22)
    ON CONFLICT (document_number) DO NOTHING;

    -- =====================================================
    -- CHAPTER 04: Planning (3 docs)
    -- =====================================================
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, sort_order)
    VALUES
        (uuid_generate_v4(), 'IMS-PR-04-001', 'Risk and Opportunity Management Procedure', 'إجراء إدارة المخاطر والفرص', 'procedure', '2.0', 'active', '/docs/ims/IMS-PR-04-001.pdf', v_uploaded_by, 'PR', 4, 'IMS', 30),
        (uuid_generate_v4(), 'IMS-FO-04-001', 'Risk Register Form', 'نموذج سجل المخاطر', 'form', '2.0', 'active', '/docs/ims/IMS-FO-04-001.pdf', v_uploaded_by, 'FO', 4, 'IMS', 31),
        (uuid_generate_v4(), 'IMS-FO-04-002', 'Objectives and Targets Form', 'نموذج الأهداف والغايات', 'form', '2.0', 'active', '/docs/ims/IMS-FO-04-002.pdf', v_uploaded_by, 'FO', 4, 'IMS', 32)
    ON CONFLICT (document_number) DO NOTHING;

    -- =====================================================
    -- CHAPTER 05: Support & Resources (4 docs)
    -- =====================================================
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, sort_order)
    VALUES
        (uuid_generate_v4(), 'IMS-PR-05-001', 'Competence and Training Procedure', 'إجراء الكفاءة والتدريب', 'procedure', '3.0', 'active', '/docs/ims/IMS-PR-05-001.pdf', v_uploaded_by, 'PR', 5, 'IMS', 40),
        (uuid_generate_v4(), 'IMS-PR-05-002', 'Communication Procedure', 'إجراء التواصل', 'procedure', '2.0', 'active', '/docs/ims/IMS-PR-05-002.pdf', v_uploaded_by, 'PR', 5, 'IMS', 41),
        (uuid_generate_v4(), 'IMS-FO-05-001', 'Training Record Form', 'نموذج سجل التدريب', 'form', '2.0', 'active', '/docs/ims/IMS-FO-05-001.pdf', v_uploaded_by, 'FO', 5, 'IMS', 42),
        (uuid_generate_v4(), 'IMS-FO-05-002', 'Training Plan Form', 'نموذج خطة التدريب', 'form', '2.0', 'active', '/docs/ims/IMS-FO-05-002.pdf', v_uploaded_by, 'FO', 5, 'IMS', 43)
    ON CONFLICT (document_number) DO NOTHING;

    -- =====================================================
    -- CHAPTER 06: Operation — Production (4 docs)
    -- =====================================================
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, sort_order)
    VALUES
        (uuid_generate_v4(), 'IMS-PS-06-001', 'Production Planning and Control Process', 'عملية تخطيط ومراقبة الإنتاج', 'procedure', '3.0', 'active', '/docs/ims/IMS-PS-06-001.pdf', v_uploaded_by, 'PS', 6, 'IMS', 50),
        (uuid_generate_v4(), 'IMS-PR-06-001', 'Material Handling and Storage Procedure', 'إجراء مناولة وتخزين المواد', 'procedure', '2.0', 'active', '/docs/ims/IMS-PR-06-001.pdf', v_uploaded_by, 'PR', 6, 'IMS', 51),
        (uuid_generate_v4(), 'IMS-WI-06-001', 'Batch Production Work Instruction', 'تعليمات عمل إنتاج الدفعات', 'procedure', '2.0', 'active', '/docs/ims/IMS-WI-06-001.pdf', v_uploaded_by, 'WI', 6, 'IMS', 52),
        (uuid_generate_v4(), 'IMS-FO-06-001', 'Batch Production Record', 'سجل إنتاج الدفعة', 'form', '2.0', 'active', '/docs/ims/IMS-FO-06-001.pdf', v_uploaded_by, 'FO', 6, 'IMS', 53)
    ON CONFLICT (document_number) DO NOTHING;

    -- =====================================================
    -- CHAPTER 07: Quality Control (4 docs)
    -- =====================================================
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, sort_order)
    VALUES
        (uuid_generate_v4(), 'IMS-PR-07-001', 'Quality Control Procedure', 'إجراء مراقبة الجودة', 'procedure', '3.0', 'active', '/docs/ims/IMS-PR-07-001.pdf', v_uploaded_by, 'PR', 7, 'IMS', 60),
        (uuid_generate_v4(), 'IMS-PR-07-002', 'Nonconforming Product Procedure', 'إجراء المنتج غير المطابق', 'procedure', '2.0', 'active', '/docs/ims/IMS-PR-07-002.pdf', v_uploaded_by, 'PR', 7, 'IMS', 61),
        (uuid_generate_v4(), 'IMS-FO-07-001', 'Inspection and Test Record', 'سجل الفحص والاختبار', 'form', '2.0', 'active', '/docs/ims/IMS-FO-07-001.pdf', v_uploaded_by, 'FO', 7, 'IMS', 62),
        (uuid_generate_v4(), 'IMS-FO-07-002', 'NCR Form', 'نموذج عدم المطابقة', 'form', '2.0', 'active', '/docs/ims/IMS-FO-07-002.pdf', v_uploaded_by, 'FO', 7, 'IMS', 63)
    ON CONFLICT (document_number) DO NOTHING;

    -- =====================================================
    -- CHAPTER 08: Performance Evaluation & Improvement (5 docs)
    -- =====================================================
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, sort_order)
    VALUES
        (uuid_generate_v4(), 'IMS-PR-08-001', 'Internal Audit Procedure', 'إجراء التدقيق الداخلي', 'procedure', '3.0', 'active', '/docs/ims/IMS-PR-08-001.pdf', v_uploaded_by, 'PR', 8, 'IMS', 70),
        (uuid_generate_v4(), 'IMS-PR-08-002', 'Corrective and Preventive Action Procedure', 'إجراء الإجراءات التصحيحية والوقائية', 'procedure', '2.0', 'active', '/docs/ims/IMS-PR-08-002.pdf', v_uploaded_by, 'PR', 8, 'IMS', 71),
        (uuid_generate_v4(), 'IMS-PR-08-003', 'Continual Improvement Procedure', 'إجراء التحسين المستمر', 'procedure', '2.0', 'active', '/docs/ims/IMS-PR-08-003.pdf', v_uploaded_by, 'PR', 8, 'IMS', 72),
        (uuid_generate_v4(), 'IMS-FO-08-001', 'Internal Audit Checklist', 'قائمة تدقيق داخلي', 'form', '2.0', 'active', '/docs/ims/IMS-FO-08-001.pdf', v_uploaded_by, 'FO', 8, 'IMS', 73),
        (uuid_generate_v4(), 'IMS-FO-08-002', 'CAPA Form', 'نموذج الإجراءات التصحيحية والوقائية', 'form', '2.0', 'active', '/docs/ims/IMS-FO-08-002.pdf', v_uploaded_by, 'FO', 8, 'IMS', 74)
    ON CONFLICT (document_number) DO NOTHING;

    -- =====================================================
    -- CHAPTER 09: Maintenance Management (10 docs, hierarchical)
    -- =====================================================
    -- L1 parent
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, document_level, sort_order)
    VALUES (uuid_generate_v4(), 'IMS-PS-09-001', 'Maintenance Management Process', 'عملية إدارة الصيانة', 'procedure', '3.0', 'active', '/docs/ims/IMS-PS-09-001.pdf', v_uploaded_by, 'PS', 9, 'IMS', 'L1', 80)
    ON CONFLICT (document_number) DO NOTHING;

    -- L2 children
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, document_level, parent_id, sort_order)
    VALUES
        (uuid_generate_v4(), 'IMS-PR-09-001', 'Preventive Maintenance Procedure', 'إجراء الصيانة الوقائية', 'procedure', '3.0', 'active', '/docs/ims/IMS-PR-09-001.pdf', v_uploaded_by, 'PR', 9, 'IMS', 'L2', (SELECT id FROM documents WHERE document_number = 'IMS-PS-09-001'), 81),
        (uuid_generate_v4(), 'IMS-PR-09-002', 'Corrective Maintenance Procedure', 'إجراء الصيانة التصحيحية', 'procedure', '2.0', 'active', '/docs/ims/IMS-PR-09-002.pdf', v_uploaded_by, 'PR', 9, 'IMS', 'L2', (SELECT id FROM documents WHERE document_number = 'IMS-PS-09-001'), 82),
        (uuid_generate_v4(), 'IMS-LI-09-001', 'Equipment Register', 'سجل المعدات', 'other', '3.0', 'active', '/docs/ims/IMS-LI-09-001.pdf', v_uploaded_by, 'LI', 9, 'IMS', 'L2', (SELECT id FROM documents WHERE document_number = 'IMS-PS-09-001'), 89)
    ON CONFLICT (document_number) DO NOTHING;

    -- L3 work instructions
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, document_level, parent_id, sort_order)
    VALUES
        (uuid_generate_v4(), 'IMS-WI-09-001', 'PM Scheduling Work Instruction', 'تعليمات عمل جدولة الصيانة الوقائية', 'procedure', '2.0', 'active', '/docs/ims/IMS-WI-09-001.pdf', v_uploaded_by, 'WI', 9, 'IMS', 'L3', (SELECT id FROM documents WHERE document_number = 'IMS-PR-09-001'), 83),
        (uuid_generate_v4(), 'IMS-WI-09-002', 'Equipment Lubrication Work Instruction', 'تعليمات عمل تشحيم المعدات', 'procedure', '2.0', 'active', '/docs/ims/IMS-WI-09-002.pdf', v_uploaded_by, 'WI', 9, 'IMS', 'L3', (SELECT id FROM documents WHERE document_number = 'IMS-PR-09-001'), 84),
        (uuid_generate_v4(), 'IMS-WI-09-003', 'Breakdown Repair Work Instruction', 'تعليمات عمل إصلاح الأعطال', 'procedure', '2.0', 'active', '/docs/ims/IMS-WI-09-003.pdf', v_uploaded_by, 'WI', 9, 'IMS', 'L3', (SELECT id FROM documents WHERE document_number = 'IMS-PR-09-002'), 85)
    ON CONFLICT (document_number) DO NOTHING;

    -- L4 forms
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, document_level, parent_id, sort_order)
    VALUES
        (uuid_generate_v4(), 'IMS-FO-09-001', 'PM Schedule Form', 'نموذج جدول الصيانة الوقائية', 'form', '2.0', 'active', '/docs/ims/IMS-FO-09-001.pdf', v_uploaded_by, 'FO', 9, 'IMS', 'L4', (SELECT id FROM documents WHERE document_number = 'IMS-WI-09-001'), 86),
        (uuid_generate_v4(), 'IMS-FO-09-002', 'Work Order Form', 'نموذج أمر العمل', 'form', '3.0', 'active', '/docs/ims/IMS-FO-09-002.pdf', v_uploaded_by, 'FO', 9, 'IMS', 'L4', (SELECT id FROM documents WHERE document_number = 'IMS-WI-09-001'), 87),
        (uuid_generate_v4(), 'IMS-FO-09-003', 'Equipment History Card', 'بطاقة تاريخ المعدات', 'form', '2.0', 'active', '/docs/ims/IMS-FO-09-003.pdf', v_uploaded_by, 'FO', 9, 'IMS', 'L4', (SELECT id FROM documents WHERE document_number = 'IMS-WI-09-003'), 88)
    ON CONFLICT (document_number) DO NOTHING;

    -- =====================================================
    -- CHAPTER 10: Calibration (5 docs, hierarchical)
    -- =====================================================
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, document_level, sort_order)
    VALUES (uuid_generate_v4(), 'IMS-PS-10-001', 'Calibration Management Process', 'عملية إدارة المعايرة', 'procedure', '2.0', 'active', '/docs/ims/IMS-PS-10-001.pdf', v_uploaded_by, 'PS', 10, 'IMS', 'L1', 90)
    ON CONFLICT (document_number) DO NOTHING;

    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, document_level, parent_id, sort_order)
    VALUES
        (uuid_generate_v4(), 'IMS-PR-10-001', 'Calibration Procedure', 'إجراء المعايرة', 'procedure', '2.0', 'active', '/docs/ims/IMS-PR-10-001.pdf', v_uploaded_by, 'PR', 10, 'IMS', 'L2', (SELECT id FROM documents WHERE document_number = 'IMS-PS-10-001'), 91),
        (uuid_generate_v4(), 'IMS-PR-10-002', 'Instrument Verification Procedure', 'إجراء التحقق من الأدوات', 'procedure', '2.0', 'active', '/docs/ims/IMS-PR-10-002.pdf', v_uploaded_by, 'PR', 10, 'IMS', 'L2', (SELECT id FROM documents WHERE document_number = 'IMS-PS-10-001'), 92),
        (uuid_generate_v4(), 'IMS-FO-10-001', 'Calibration Record Form', 'نموذج سجل المعايرة', 'form', '2.0', 'active', '/docs/ims/IMS-FO-10-001.pdf', v_uploaded_by, 'FO', 10, 'IMS', 'L4', (SELECT id FROM documents WHERE document_number = 'IMS-PR-10-001'), 93),
        (uuid_generate_v4(), 'IMS-LI-10-001', 'Calibration Instruments Register', 'سجل أدوات المعايرة', 'other', '2.0', 'active', '/docs/ims/IMS-LI-10-001.pdf', v_uploaded_by, 'LI', 10, 'IMS', 'L2', (SELECT id FROM documents WHERE document_number = 'IMS-PS-10-001'), 94)
    ON CONFLICT (document_number) DO NOTHING;

    -- =====================================================
    -- CHAPTER 11: Spare Parts (4 docs, hierarchical)
    -- =====================================================
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, document_level, sort_order)
    VALUES (uuid_generate_v4(), 'IMS-PS-11-001', 'Spare Parts Management Process', 'عملية إدارة قطع الغيار', 'procedure', '2.0', 'active', '/docs/ims/IMS-PS-11-001.pdf', v_uploaded_by, 'PS', 11, 'IMS', 'L1', 100)
    ON CONFLICT (document_number) DO NOTHING;

    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, document_level, parent_id, sort_order)
    VALUES
        (uuid_generate_v4(), 'IMS-PR-11-001', 'Spare Parts Procurement Procedure', 'إجراء شراء قطع الغيار', 'procedure', '2.0', 'active', '/docs/ims/IMS-PR-11-001.pdf', v_uploaded_by, 'PR', 11, 'IMS', 'L2', (SELECT id FROM documents WHERE document_number = 'IMS-PS-11-001'), 101),
        (uuid_generate_v4(), 'IMS-FO-11-001', 'Spare Parts Request Form', 'نموذج طلب قطع غيار', 'form', '2.0', 'active', '/docs/ims/IMS-FO-11-001.pdf', v_uploaded_by, 'FO', 11, 'IMS', 'L4', (SELECT id FROM documents WHERE document_number = 'IMS-PR-11-001'), 102),
        (uuid_generate_v4(), 'IMS-LI-11-001', 'Spare Parts Inventory List', 'قائمة جرد قطع الغيار', 'other', '2.0', 'active', '/docs/ims/IMS-LI-11-001.pdf', v_uploaded_by, 'LI', 11, 'IMS', 'L2', (SELECT id FROM documents WHERE document_number = 'IMS-PS-11-001'), 103)
    ON CONFLICT (document_number) DO NOTHING;

    -- =====================================================
    -- CHAPTER 12: Safety & Permits (4 docs, hierarchical)
    -- =====================================================
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, document_level, sort_order)
    VALUES (uuid_generate_v4(), 'IMS-PS-12-001', 'Safety and Permit to Work Process', 'عملية السلامة وتصاريح العمل', 'procedure', '2.0', 'active', '/docs/ims/IMS-PS-12-001.pdf', v_uploaded_by, 'PS', 12, 'IMS', 'L1', 110)
    ON CONFLICT (document_number) DO NOTHING;

    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, document_level, parent_id, sort_order)
    VALUES
        (uuid_generate_v4(), 'IMS-PR-12-001', 'Permit to Work Procedure', 'إجراء تصاريح العمل', 'procedure', '2.0', 'active', '/docs/ims/IMS-PR-12-001.pdf', v_uploaded_by, 'PR', 12, 'IMS', 'L2', (SELECT id FROM documents WHERE document_number = 'IMS-PS-12-001'), 111),
        (uuid_generate_v4(), 'IMS-PR-12-002', 'LOTO Procedure', 'إجراء قفل وتعليق الطاقة', 'procedure', '2.0', 'active', '/docs/ims/IMS-PR-12-002.pdf', v_uploaded_by, 'PR', 12, 'IMS', 'L2', (SELECT id FROM documents WHERE document_number = 'IMS-PS-12-001'), 112),
        (uuid_generate_v4(), 'IMS-FO-12-001', 'Permit to Work Form', 'نموذج تصريح العمل', 'form', '2.0', 'active', '/docs/ims/IMS-FO-12-001.pdf', v_uploaded_by, 'FO', 12, 'IMS', 'L4', (SELECT id FROM documents WHERE document_number = 'IMS-PR-12-001'), 113)
    ON CONFLICT (document_number) DO NOTHING;

    -- =====================================================
    -- CHAPTER 13: Utilities (3 docs, hierarchical)
    -- =====================================================
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, document_level, sort_order)
    VALUES (uuid_generate_v4(), 'IMS-PS-13-001', 'Utilities Management Process', 'عملية إدارة المرافق', 'procedure', '2.0', 'active', '/docs/ims/IMS-PS-13-001.pdf', v_uploaded_by, 'PS', 13, 'IMS', 'L1', 120)
    ON CONFLICT (document_number) DO NOTHING;

    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, document_level, parent_id, sort_order)
    VALUES
        (uuid_generate_v4(), 'IMS-WI-13-001', 'Boiler Operation Work Instruction', 'تعليمات عمل تشغيل الغلايات', 'procedure', '2.0', 'active', '/docs/ims/IMS-WI-13-001.pdf', v_uploaded_by, 'WI', 13, 'IMS', 'L3', (SELECT id FROM documents WHERE document_number = 'IMS-PS-13-001'), 121),
        (uuid_generate_v4(), 'IMS-WI-13-002', 'Compressed Air System Work Instruction', 'تعليمات عمل نظام الهواء المضغوط', 'procedure', '2.0', 'active', '/docs/ims/IMS-WI-13-002.pdf', v_uploaded_by, 'WI', 13, 'IMS', 'L3', (SELECT id FROM documents WHERE document_number = 'IMS-PS-13-001'), 122)
    ON CONFLICT (document_number) DO NOTHING;

    -- =====================================================
    -- CHAPTER 14: Warehouse & Stores (3 docs, hierarchical)
    -- =====================================================
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, document_level, sort_order)
    VALUES (uuid_generate_v4(), 'IMS-PS-14-001', 'Warehouse and Stores Management Process', 'عملية إدارة المستودعات والمخازن', 'procedure', '2.0', 'active', '/docs/ims/IMS-PS-14-001.pdf', v_uploaded_by, 'PS', 14, 'IMS', 'L1', 130)
    ON CONFLICT (document_number) DO NOTHING;

    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, document_level, parent_id, sort_order)
    VALUES
        (uuid_generate_v4(), 'IMS-PR-14-001', 'Material Receipt and Issue Procedure', 'إجراء استلام وصرف المواد', 'procedure', '2.0', 'active', '/docs/ims/IMS-PR-14-001.pdf', v_uploaded_by, 'PR', 14, 'IMS', 'L2', (SELECT id FROM documents WHERE document_number = 'IMS-PS-14-001'), 131),
        (uuid_generate_v4(), 'IMS-FO-14-001', 'Material Issue Voucher', 'سند صرف مواد', 'form', '2.0', 'active', '/docs/ims/IMS-FO-14-001.pdf', v_uploaded_by, 'FO', 14, 'IMS', 'L4', (SELECT id FROM documents WHERE document_number = 'IMS-PR-14-001'), 132)
    ON CONFLICT (document_number) DO NOTHING;

    -- =====================================================
    -- CHAPTER 15: Projects & MOC (3 docs, hierarchical)
    -- =====================================================
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, document_level, sort_order)
    VALUES (uuid_generate_v4(), 'IMS-PS-15-001', 'Project and Management of Change Process', 'عملية المشاريع وإدارة التغيير', 'procedure', '2.0', 'active', '/docs/ims/IMS-PS-15-001.pdf', v_uploaded_by, 'PS', 15, 'IMS', 'L1', 140)
    ON CONFLICT (document_number) DO NOTHING;

    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, document_level, parent_id, sort_order)
    VALUES
        (uuid_generate_v4(), 'IMS-PR-15-001', 'Management of Change Procedure', 'إجراء إدارة التغيير', 'procedure', '2.0', 'active', '/docs/ims/IMS-PR-15-001.pdf', v_uploaded_by, 'PR', 15, 'IMS', 'L2', (SELECT id FROM documents WHERE document_number = 'IMS-PS-15-001'), 141),
        (uuid_generate_v4(), 'IMS-FO-15-001', 'MOC Request Form', 'نموذج طلب إدارة التغيير', 'form', '2.0', 'active', '/docs/ims/IMS-FO-15-001.pdf', v_uploaded_by, 'FO', 15, 'IMS', 'L4', (SELECT id FROM documents WHERE document_number = 'IMS-PR-15-001'), 142)
    ON CONFLICT (document_number) DO NOTHING;

    -- =====================================================
    -- CHAPTER 19: Emergency Response (2 docs)
    -- =====================================================
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, sort_order)
    VALUES
        (uuid_generate_v4(), 'IMS-PR-19-001', 'Emergency Response Procedure', 'إجراء الاستجابة للطوارئ', 'procedure', '3.0', 'active', '/docs/ims/IMS-PR-19-001.pdf', v_uploaded_by, 'PR', 19, 'IMS', 150),
        (uuid_generate_v4(), 'IMS-FO-19-001', 'Emergency Drill Report Form', 'نموذج تقرير تمرين الطوارئ', 'form', '2.0', 'active', '/docs/ims/IMS-FO-19-001.pdf', v_uploaded_by, 'FO', 19, 'IMS', 151)
    ON CONFLICT (document_number) DO NOTHING;

    -- =====================================================
    -- GMP DOMAIN (17 documents)
    -- =====================================================
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, sort_order)
    VALUES
        (uuid_generate_v4(), 'GMP-MA-01-001', 'GMP Manual', 'دليل ممارسات التصنيع الجيد', 'procedure', '3.0', 'active', '/docs/gmp/GMP-MA-01-001.pdf', v_uploaded_by, 'MA', 1, 'GMP', 200),
        (uuid_generate_v4(), 'GMP-PS-01-001', 'GMP System Process', 'عملية نظام GMP', 'procedure', '2.0', 'active', '/docs/gmp/GMP-PS-01-001.pdf', v_uploaded_by, 'PS', 1, 'GMP', 201),
        (uuid_generate_v4(), 'GMP-PR-01-001', 'Personnel Hygiene Procedure', 'إجراء نظافة الأفراد', 'procedure', '2.0', 'active', '/docs/gmp/GMP-PR-01-001.pdf', v_uploaded_by, 'PR', 1, 'GMP', 202),
        (uuid_generate_v4(), 'GMP-PR-01-002', 'Cleaning and Sanitation Procedure', 'إجراء التنظيف والتعقيم', 'procedure', '2.0', 'active', '/docs/gmp/GMP-PR-01-002.pdf', v_uploaded_by, 'PR', 1, 'GMP', 203),
        (uuid_generate_v4(), 'GMP-PR-01-003', 'Pest Control Procedure', 'إجراء مكافحة الآفات', 'procedure', '2.0', 'active', '/docs/gmp/GMP-PR-01-003.pdf', v_uploaded_by, 'PR', 1, 'GMP', 204),
        (uuid_generate_v4(), 'GMP-PR-01-004', 'Water Treatment Procedure', 'إجراء معالجة المياه', 'procedure', '2.0', 'active', '/docs/gmp/GMP-PR-01-004.pdf', v_uploaded_by, 'PR', 1, 'GMP', 205),
        (uuid_generate_v4(), 'GMP-PR-01-005', 'Raw Material Control Procedure', 'إجراء مراقبة المواد الخام', 'procedure', '2.0', 'active', '/docs/gmp/GMP-PR-01-005.pdf', v_uploaded_by, 'PR', 1, 'GMP', 206),
        (uuid_generate_v4(), 'GMP-PR-01-006', 'Product Recall Procedure', 'إجراء سحب المنتج', 'procedure', '2.0', 'active', '/docs/gmp/GMP-PR-01-006.pdf', v_uploaded_by, 'PR', 1, 'GMP', 207),
        (uuid_generate_v4(), 'GMP-WI-01-001', 'CIP Cleaning Work Instruction', 'تعليمات عمل التنظيف في المكان', 'procedure', '2.0', 'active', '/docs/gmp/GMP-WI-01-001.pdf', v_uploaded_by, 'WI', 1, 'GMP', 208),
        (uuid_generate_v4(), 'GMP-WI-01-002', 'Water Sampling Work Instruction', 'تعليمات عمل أخذ عينات المياه', 'procedure', '2.0', 'active', '/docs/gmp/GMP-WI-01-002.pdf', v_uploaded_by, 'WI', 1, 'GMP', 209),
        (uuid_generate_v4(), 'GMP-FO-01-001', 'Cleaning Record Form', 'نموذج سجل التنظيف', 'form', '2.0', 'active', '/docs/gmp/GMP-FO-01-001.pdf', v_uploaded_by, 'FO', 1, 'GMP', 210),
        (uuid_generate_v4(), 'GMP-FO-01-002', 'Pest Control Log', 'سجل مكافحة الآفات', 'form', '2.0', 'active', '/docs/gmp/GMP-FO-01-002.pdf', v_uploaded_by, 'FO', 1, 'GMP', 211),
        (uuid_generate_v4(), 'GMP-FO-01-003', 'Water Test Results Form', 'نموذج نتائج اختبار المياه', 'form', '2.0', 'active', '/docs/gmp/GMP-FO-01-003.pdf', v_uploaded_by, 'FO', 1, 'GMP', 212),
        (uuid_generate_v4(), 'GMP-FO-01-004', 'Visitor Hygiene Declaration', 'إقرار نظافة الزوار', 'form', '1.0', 'active', '/docs/gmp/GMP-FO-01-004.pdf', v_uploaded_by, 'FO', 1, 'GMP', 213),
        (uuid_generate_v4(), 'GMP-FO-01-005', 'Raw Material Inspection Form', 'نموذج فحص المواد الخام', 'form', '2.0', 'active', '/docs/gmp/GMP-FO-01-005.pdf', v_uploaded_by, 'FO', 1, 'GMP', 214),
        (uuid_generate_v4(), 'GMP-FO-01-006', 'Product Recall Log', 'سجل سحب المنتج', 'form', '1.0', 'active', '/docs/gmp/GMP-FO-01-006.pdf', v_uploaded_by, 'FO', 1, 'GMP', 215),
        (uuid_generate_v4(), 'GMP-LI-01-001', 'Approved Supplier List (GMP)', 'قائمة الموردين المعتمدين (GMP)', 'other', '2.0', 'active', '/docs/gmp/GMP-LI-01-001.pdf', v_uploaded_by, 'LI', 1, 'GMP', 216)
    ON CONFLICT (document_number) DO NOTHING;

    -- =====================================================
    -- QLY DOMAIN (8 documents)
    -- =====================================================
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, sort_order)
    VALUES
        (uuid_generate_v4(), 'QLY-MA-01-001', 'Quality Manual', 'دليل الجودة', 'procedure', '3.0', 'active', '/docs/qly/QLY-MA-01-001.pdf', v_uploaded_by, 'MA', 1, 'QLY', 300),
        (uuid_generate_v4(), 'QLY-PR-01-001', 'Customer Complaint Procedure', 'إجراء شكاوى العملاء', 'procedure', '2.0', 'active', '/docs/qly/QLY-PR-01-001.pdf', v_uploaded_by, 'PR', 1, 'QLY', 301),
        (uuid_generate_v4(), 'QLY-PR-01-002', 'Supplier Evaluation Procedure', 'إجراء تقييم الموردين', 'procedure', '2.0', 'active', '/docs/qly/QLY-PR-01-002.pdf', v_uploaded_by, 'PR', 1, 'QLY', 302),
        (uuid_generate_v4(), 'QLY-PR-01-003', 'Product Release Procedure', 'إجراء إصدار المنتج', 'procedure', '2.0', 'active', '/docs/qly/QLY-PR-01-003.pdf', v_uploaded_by, 'PR', 1, 'QLY', 303),
        (uuid_generate_v4(), 'QLY-FO-01-001', 'Customer Complaint Form', 'نموذج شكوى العميل', 'form', '2.0', 'active', '/docs/qly/QLY-FO-01-001.pdf', v_uploaded_by, 'FO', 1, 'QLY', 304),
        (uuid_generate_v4(), 'QLY-FO-01-002', 'Supplier Evaluation Form', 'نموذج تقييم المورد', 'form', '2.0', 'active', '/docs/qly/QLY-FO-01-002.pdf', v_uploaded_by, 'FO', 1, 'QLY', 305),
        (uuid_generate_v4(), 'QLY-FO-01-003', 'Product Release Certificate', 'شهادة إصدار المنتج', 'form', '2.0', 'active', '/docs/qly/QLY-FO-01-003.pdf', v_uploaded_by, 'FO', 1, 'QLY', 306),
        (uuid_generate_v4(), 'QLY-LI-01-001', 'Approved Supplier List (Quality)', 'قائمة الموردين المعتمدين (الجودة)', 'other', '2.0', 'active', '/docs/qly/QLY-LI-01-001.pdf', v_uploaded_by, 'LI', 1, 'QLY', 307)
    ON CONFLICT (document_number) DO NOTHING;

    -- =====================================================
    -- ENV DOMAIN (4 documents)
    -- =====================================================
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, sort_order)
    VALUES
        (uuid_generate_v4(), 'ENV-PR-01-001', 'Environmental Aspects and Impacts Procedure', 'إجراء الجوانب والتأثيرات البيئية', 'procedure', '2.0', 'active', '/docs/env/ENV-PR-01-001.pdf', v_uploaded_by, 'PR', 1, 'ENV', 400),
        (uuid_generate_v4(), 'ENV-PR-01-002', 'Waste Management Procedure', 'إجراء إدارة النفايات', 'procedure', '2.0', 'active', '/docs/env/ENV-PR-01-002.pdf', v_uploaded_by, 'PR', 1, 'ENV', 401),
        (uuid_generate_v4(), 'ENV-FO-01-001', 'Environmental Aspects Register', 'سجل الجوانب البيئية', 'form', '2.0', 'active', '/docs/env/ENV-FO-01-001.pdf', v_uploaded_by, 'FO', 1, 'ENV', 402),
        (uuid_generate_v4(), 'ENV-FO-01-002', 'Waste Disposal Log', 'سجل التخلص من النفايات', 'form', '2.0', 'active', '/docs/env/ENV-FO-01-002.pdf', v_uploaded_by, 'FO', 1, 'ENV', 403)
    ON CONFLICT (document_number) DO NOTHING;

    -- =====================================================
    -- OHS DOMAIN (4 documents)
    -- =====================================================
    INSERT INTO documents (id, document_number, title_en, title_ar, category, version, status, file_path, uploaded_by, type_code, chapter, domain, sort_order)
    VALUES
        (uuid_generate_v4(), 'OHS-PR-01-001', 'Hazard Identification and Risk Assessment Procedure', 'إجراء تحديد المخاطر وتقييم المخاطر', 'procedure', '2.0', 'active', '/docs/ohs/OHS-PR-01-001.pdf', v_uploaded_by, 'PR', 1, 'OHS', 500),
        (uuid_generate_v4(), 'OHS-PR-01-002', 'Incident Investigation Procedure', 'إجراء التحقيق في الحوادث', 'procedure', '2.0', 'active', '/docs/ohs/OHS-PR-01-002.pdf', v_uploaded_by, 'PR', 1, 'OHS', 501),
        (uuid_generate_v4(), 'OHS-FO-01-001', 'Risk Assessment Form', 'نموذج تقييم المخاطر', 'form', '2.0', 'active', '/docs/ohs/OHS-FO-01-001.pdf', v_uploaded_by, 'FO', 1, 'OHS', 502),
        (uuid_generate_v4(), 'OHS-FO-01-002', 'Incident Report Form', 'نموذج تقرير الحادث', 'form', '2.0', 'active', '/docs/ohs/OHS-FO-01-002.pdf', v_uploaded_by, 'FO', 1, 'OHS', 503)
    ON CONFLICT (document_number) DO NOTHING;

    -- Total: 83 documents (IMS:50, GMP:17, QLY:8, ENV:4, OHS:4)
END $$;
