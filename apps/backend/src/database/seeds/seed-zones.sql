-- ============================================================================
-- Seed: Warehouse Zones for KEMYAN Store Management System
-- ============================================================================
-- Four primary zones reflecting the chemical plant layout:
--   Zone A: Acidic raw materials (phosphoric acid, sulfuric acid)
--   Zone B: Calcium-based raw materials (limestone, quicklime)
--   Zone C: Finished goods (MCP, DCP products)
--   QC-HOLD: Quarantine area for materials pending quality approval
-- ============================================================================

INSERT INTO zones (code, name_en, name_ar, zone_type, allowed_compatibility_groups, safety_equipment, max_temperature, max_humidity) VALUES

-- ---------------------------------------------------------------------------
-- Zone A: Acidic Raw Materials
-- Stores phosphoric acid (H3PO4) and sulfuric acid (H2SO4).
-- Requires acid-resistant PPE and spill containment.
-- ---------------------------------------------------------------------------
('RM-ACID',
 'Zone A - Acid Raw Materials',
 'المنطقة أ - المواد الخام الحمضية',
 'raw_material',
 '["acids", "corrosives"]',
 '{"required_ppe": ["chemical_goggles", "acid_resistant_gloves", "face_shield", "chemical_suit", "safety_boots"], "safety_shower": true, "eye_wash_station": true, "spill_kit": "acid", "ventilation": "forced"}',
 45.0,
 70.0),

-- ---------------------------------------------------------------------------
-- Zone B: Calcium-Based Raw Materials
-- Stores limestone (CaCO3) and quicklime (CaO).
-- CaO is reactive with water and generates heat; keep dry.
-- ---------------------------------------------------------------------------
('RM-CALCIUM',
 'Zone B - Calcium Raw Materials',
 'المنطقة ب - المواد الخام الكلسية',
 'raw_material',
 '["calcium_compounds", "alkaline"]',
 '{"required_ppe": ["dust_mask", "safety_goggles", "gloves", "safety_boots"], "dust_extraction": true, "ventilation": "natural"}',
 50.0,
 60.0),

-- ---------------------------------------------------------------------------
-- Zone C: Finished Goods
-- Stores Monocalcium Phosphate (MCP) and Dicalcium Phosphate (DCP).
-- Feed-grade products require GMP+ compliant storage conditions.
-- ---------------------------------------------------------------------------
('FG',
 'Zone C - Finished Products (MCP/DCP)',
 'المنطقة ج - المنتجات النهائية',
 'finished_goods',
 '["feed_grade_phosphates"]',
 '{"required_ppe": ["dust_mask", "gloves", "safety_boots"], "ventilation": "natural", "pest_control": true}',
 40.0,
 65.0),

-- ---------------------------------------------------------------------------
-- QC-HOLD: Quarantine Area
-- Holds materials pending quality inspection or those under investigation.
-- Segregated from production zones to prevent accidental use.
-- ---------------------------------------------------------------------------
('QC-HOLD',
 'Quarantine - QC Hold Area',
 'منطقة الحجر - انتظار الجودة',
 'quarantine',
 '["acids", "corrosives", "calcium_compounds", "alkaline", "feed_grade_phosphates"]',
 '{"required_ppe": ["safety_goggles", "gloves", "safety_boots"], "access_restricted": true}',
 45.0,
 70.0);
