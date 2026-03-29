-- ============================================================================
-- Seed: Demo Materials for KEMYAN Store Management System
-- ============================================================================
-- Sample materials representing the core KEMYAN product chain:
--   Raw Materials: Phosphoric Acid, Sulfuric Acid, Limestone, Quicklime
--   Finished Products: Monocalcium Phosphate (MCP), Dicalcium Phosphate (DCP)
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Step 1: Create material categories
-- ---------------------------------------------------------------------------
INSERT INTO material_categories (id, name_en, name_ar, requires_quality_approval) VALUES
(uuid_generate_v4(), 'Raw Materials', 'المواد الخام', true),
(uuid_generate_v4(), 'Finished Products', 'المنتجات النهائية', true);

-- ---------------------------------------------------------------------------
-- Step 2: Insert materials
-- GHS classification follows the Globally Harmonized System of
-- Classification and Labelling of Chemicals (GHS Rev.9).
-- ---------------------------------------------------------------------------

-- Phosphoric Acid (H3PO4, 75-85%) - Feed Grade
INSERT INTO materials (
    code, name_en, name_ar, category_id, unit_of_measure,
    ghs_classification, reorder_point, reorder_quantity,
    minimum_shelf_life_percent, is_feed_grade, specifications
) VALUES (
    'RM-PA-001',
    'Phosphoric Acid (H₃PO₄, 75-85%)',
    'حمض الفوسفوريك',
    (SELECT id FROM material_categories WHERE name_en = 'Raw Materials'),
    'MT',
    '{
        "pictograms": ["GHS05", "GHS07"],
        "signal_word": "Danger",
        "hazard_statements": ["H290", "H314"],
        "precautionary_statements": ["P260", "P264", "P280", "P301+P330+P331", "P303+P361+P353", "P305+P351+P338"],
        "hazard_class": "Corrosive to metals, Category 1; Skin corrosion, Category 1A",
        "un_number": "UN1805",
        "transport_class": 8
    }',
    50.000,
    200.000,
    75.00,
    true,
    '{
        "concentration_min": 75.0,
        "concentration_max": 85.0,
        "appearance": "Clear viscous liquid",
        "density_range": "1.57-1.68 g/cm³",
        "heavy_metals_max_ppm": {"arsenic": 1, "lead": 1, "cadmium": 1, "mercury": 0.1},
        "fluoride_max_ppm": 10
    }'
);

-- Sulfuric Acid (H2SO4)
INSERT INTO materials (
    code, name_en, name_ar, category_id, unit_of_measure,
    ghs_classification, reorder_point, reorder_quantity,
    is_feed_grade, specifications
) VALUES (
    'RM-SA-001',
    'Sulfuric Acid (H₂SO₄, 98%)',
    'حمض الكبريتيك',
    (SELECT id FROM material_categories WHERE name_en = 'Raw Materials'),
    'MT',
    '{
        "pictograms": ["GHS05", "GHS07"],
        "signal_word": "Danger",
        "hazard_statements": ["H290", "H314"],
        "precautionary_statements": ["P260", "P264", "P280", "P301+P330+P331", "P303+P361+P353", "P305+P351+P338", "P310"],
        "hazard_class": "Corrosive to metals, Category 1; Skin corrosion, Category 1A",
        "un_number": "UN1830",
        "transport_class": 8
    }',
    30.000,
    100.000,
    false,
    '{
        "concentration_min": 97.5,
        "concentration_max": 98.5,
        "appearance": "Clear oily liquid",
        "density": "1.84 g/cm³",
        "iron_max_ppm": 10
    }'
);

-- Limestone (CaCO3) - Non-Hazardous
INSERT INTO materials (
    code, name_en, name_ar, category_id, unit_of_measure,
    ghs_classification, reorder_point, reorder_quantity,
    is_feed_grade, specifications
) VALUES (
    'RM-LS-001',
    'Limestone (CaCO₃)',
    'حجر جيري (كربونات الكالسيوم)',
    (SELECT id FROM material_categories WHERE name_en = 'Raw Materials'),
    'MT',
    '{
        "pictograms": [],
        "signal_word": null,
        "hazard_statements": [],
        "precautionary_statements": ["P264", "P280"],
        "hazard_class": "Not classified as hazardous",
        "un_number": null,
        "transport_class": null
    }',
    100.000,
    500.000,
    false,
    '{
        "caco3_min_percent": 95.0,
        "appearance": "White to off-white powder/granules",
        "moisture_max_percent": 2.0,
        "particle_size": "0-50mm",
        "mgo_max_percent": 2.0
    }'
);

-- Quicklime (CaO)
INSERT INTO materials (
    code, name_en, name_ar, category_id, unit_of_measure,
    ghs_classification, reorder_point, reorder_quantity,
    is_feed_grade, specifications
) VALUES (
    'RM-QL-001',
    'Quicklime (CaO)',
    'جير حي (أكسيد الكالسيوم)',
    (SELECT id FROM material_categories WHERE name_en = 'Raw Materials'),
    'MT',
    '{
        "pictograms": ["GHS05", "GHS07"],
        "signal_word": "Danger",
        "hazard_statements": ["H315", "H318", "H335"],
        "precautionary_statements": ["P260", "P264", "P271", "P280", "P302+P352", "P305+P351+P338", "P310"],
        "hazard_class": "Skin irritation, Category 2; Serious eye damage, Category 1",
        "un_number": "UN1910",
        "transport_class": 8
    }',
    80.000,
    300.000,
    false,
    '{
        "cao_min_percent": 90.0,
        "appearance": "White to grey lumite/powder",
        "reactivity_t60": "< 2 minutes",
        "moisture_max_percent": 1.0,
        "particle_size": "0-30mm"
    }'
);

-- Monocalcium Phosphate (MCP) - Finished Product, Feed Grade
INSERT INTO materials (
    code, name_en, name_ar, category_id, unit_of_measure,
    ghs_classification, reorder_point, reorder_quantity,
    minimum_shelf_life_percent, is_feed_grade, specifications
) VALUES (
    'FG-MCP-001',
    'Monocalcium Phosphate (MCP)',
    'فوسفات أحادي الكالسيوم',
    (SELECT id FROM material_categories WHERE name_en = 'Finished Products'),
    'MT',
    '{
        "pictograms": [],
        "signal_word": null,
        "hazard_statements": [],
        "precautionary_statements": ["P264", "P280"],
        "hazard_class": "Not classified as hazardous",
        "un_number": null,
        "transport_class": null
    }',
    25.000,
    100.000,
    80.00,
    true,
    '{
        "phosphorus_min_percent": 22.0,
        "calcium_min_percent": 16.0,
        "appearance": "White to grey granular powder",
        "moisture_max_percent": 3.0,
        "fluorine_max_ppm": 1800,
        "heavy_metals_max_ppm": {"arsenic": 10, "lead": 5, "cadmium": 5, "mercury": 0.1},
        "particle_size_range": "0.2-2.5mm",
        "water_solubility_percent": ">80"
    }'
);

-- Dicalcium Phosphate (DCP) - Finished Product, Feed Grade
INSERT INTO materials (
    code, name_en, name_ar, category_id, unit_of_measure,
    ghs_classification, reorder_point, reorder_quantity,
    minimum_shelf_life_percent, is_feed_grade, specifications
) VALUES (
    'FG-DCP-001',
    'Dicalcium Phosphate (DCP)',
    'فوسفات ثنائي الكالسيوم',
    (SELECT id FROM material_categories WHERE name_en = 'Finished Products'),
    'MT',
    '{
        "pictograms": [],
        "signal_word": null,
        "hazard_statements": [],
        "precautionary_statements": ["P264", "P280"],
        "hazard_class": "Not classified as hazardous",
        "un_number": null,
        "transport_class": null
    }',
    25.000,
    100.000,
    80.00,
    true,
    '{
        "phosphorus_min_percent": 18.0,
        "calcium_min_percent": 23.0,
        "appearance": "White to off-white powder",
        "moisture_max_percent": 4.0,
        "fluorine_max_ppm": 1800,
        "heavy_metals_max_ppm": {"arsenic": 10, "lead": 5, "cadmium": 5, "mercury": 0.1},
        "particle_size_range": "0.1-1.0mm",
        "citric_acid_solubility_percent": ">95"
    }'
);
