-- Seed: Equipment type codes (44 codes) and plant units (U01-U10)

DO $$
BEGIN
  -- ============================================================
  -- 44 Equipment Type Codes from numbering WI
  -- ============================================================
  INSERT INTO equipment_type_codes (id, code, description_en, description_ar) VALUES
    (uuid_generate_v4(), 'C',  'Conveyor', 'ناقل'),
    (uuid_generate_v4(), 'D',  'Dryer', 'مجفف'),
    (uuid_generate_v4(), 'DG', 'Diesel Generator', 'مولد ديزل'),
    (uuid_generate_v4(), 'DC', 'DC Motor', 'محرك تيار مستمر'),
    (uuid_generate_v4(), 'DP', 'Dosing Pump', 'مضخة جرعات'),
    (uuid_generate_v4(), 'DS', 'Dust Collector', 'جامع غبار'),
    (uuid_generate_v4(), 'E',  'Electrical Panel', 'لوحة كهربائية'),
    (uuid_generate_v4(), 'F',  'Fan / Blower', 'مروحة / نافخ'),
    (uuid_generate_v4(), 'FB', 'Fluidized Bed', 'طبقة مميعة'),
    (uuid_generate_v4(), 'FF', 'Firefighting Equipment', 'معدات إطفاء الحريق'),
    (uuid_generate_v4(), 'FC', 'Flow Controller', 'متحكم تدفق'),
    (uuid_generate_v4(), 'G',  'Gearbox', 'علبة تروس'),
    (uuid_generate_v4(), 'H',  'Heat Exchanger', 'مبادل حراري'),
    (uuid_generate_v4(), 'IN', 'Instrument', 'جهاز قياس'),
    (uuid_generate_v4(), 'J',  'Jacketed Vessel', 'وعاء مغلف'),
    (uuid_generate_v4(), 'JD', 'Jet Dyeing Machine', 'ماكينة صباغة نفاثة'),
    (uuid_generate_v4(), 'JH', 'Jacket Heater', 'سخان مغلف'),
    (uuid_generate_v4(), 'JB', 'Junction Box', 'صندوق توصيل'),
    (uuid_generate_v4(), 'K',  'Compressor', 'ضاغط'),
    (uuid_generate_v4(), 'L',  'Level Instrument', 'جهاز قياس مستوى'),
    (uuid_generate_v4(), 'M',  'Motor', 'محرك'),
    (uuid_generate_v4(), 'N',  'Nozzle', 'فوهة'),
    (uuid_generate_v4(), 'OP', 'Operator Panel', 'لوحة تشغيل'),
    (uuid_generate_v4(), 'P',  'Pump', 'مضخة'),
    (uuid_generate_v4(), 'Q',  'Quality Instrument', 'جهاز جودة'),
    (uuid_generate_v4(), 'R',  'Reactor', 'مفاعل'),
    (uuid_generate_v4(), 'S',  'Screen / Sieve', 'غربال'),
    (uuid_generate_v4(), 'T',  'Tank', 'خزان'),
    (uuid_generate_v4(), 'U',  'Utility Equipment', 'معدات خدمات'),
    (uuid_generate_v4(), 'V',  'Valve', 'صمام'),
    (uuid_generate_v4(), 'VC', 'Vacuum Pump', 'مضخة تفريغ'),
    (uuid_generate_v4(), 'VR', 'Variable Speed Drive', 'محرك متغير السرعة'),
    (uuid_generate_v4(), 'VE', 'Vent', 'فتحة تهوية'),
    (uuid_generate_v4(), 'VV', 'Vacuum Vessel', 'وعاء تفريغ'),
    (uuid_generate_v4(), 'VM', 'Vibrating Motor', 'محرك اهتزازي'),
    (uuid_generate_v4(), 'VS', 'Vibrating Screen', 'غربال اهتزازي'),
    (uuid_generate_v4(), 'W',  'Weighing System', 'نظام وزن'),
    (uuid_generate_v4(), 'Xx', 'Mixer', 'خلاط'),
    (uuid_generate_v4(), 'Y',  'Cylinder', 'أسطوانة'),
    (uuid_generate_v4(), 'YV', 'Solenoid Valve', 'صمام كهرومغناطيسي'),
    (uuid_generate_v4(), 'YC', 'Hydraulic Cylinder', 'أسطوانة هيدروليكية'),
    (uuid_generate_v4(), 'YP', 'Pneumatic Cylinder', 'أسطوانة هوائية'),
    (uuid_generate_v4(), 'Z',  'Safety Device', 'جهاز أمان'),
    (uuid_generate_v4(), 'PM', 'Packaging Machine', 'ماكينة تغليف')
  ON CONFLICT (code) DO NOTHING;

  -- ============================================================
  -- 10 Plant Units (U01-U10)
  -- ============================================================
  INSERT INTO plant_units (id, unit_code, name_en, name_ar, sort_order) VALUES
    (uuid_generate_v4(), 'U01', 'Raw Material Storage',       'تخزين المواد الخام',         1),
    (uuid_generate_v4(), 'U02', 'Reaction Unit',              'وحدة التفاعل',               2),
    (uuid_generate_v4(), 'U03', 'Processing Unit',            'وحدة المعالجة',              3),
    (uuid_generate_v4(), 'U04', 'Drying Unit',                'وحدة التجفيف',               4),
    (uuid_generate_v4(), 'U05', 'Packaging Unit',             'وحدة التعبئة والتغليف',       5),
    (uuid_generate_v4(), 'U06', 'Utilities — Steam & Boilers','المرافق — البخار والغلايات',  6),
    (uuid_generate_v4(), 'U07', 'Utilities — Compressed Air', 'المرافق — الهواء المضغوط',    7),
    (uuid_generate_v4(), 'U08', 'Utilities — Water Treatment','المرافق — معالجة المياه',     8),
    (uuid_generate_v4(), 'U09', 'Electrical & Instrumentation','الكهرباء والأجهزة',          9),
    (uuid_generate_v4(), 'U10', 'Finished Product Warehouse', 'مستودع المنتجات النهائية',    10)
  ON CONFLICT (unit_code) DO NOTHING;

END $$;
