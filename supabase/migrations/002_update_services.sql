-- ============================================
-- Mise a jour des services avec les vrais tarifs McClean
-- ============================================

-- Supprimer les anciens services
DELETE FROM public.services;

-- Nouvelle structure : ajout de colonnes pour les categories et options
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'textile';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS vehicle_type TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS formula TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS is_quote_only BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0;

-- ============================================
-- Nettoyage textile d'ameublement
-- ============================================

INSERT INTO public.services (name_fr, name_en, description_fr, description_en, price, duration_minutes, category, is_quote_only, sort_order) VALUES
  ('Fauteuil', 'Armchair', 'Nettoyage en profondeur de votre fauteuil.', 'Deep cleaning of your armchair.', 0, 45, 'textile', true, 1),
  ('Moquette & Tapis', 'Carpet & Rug', 'Nettoyage professionnel de vos moquettes et tapis.', 'Professional cleaning of your carpets and rugs.', 0, 60, 'textile', true, 2),
  ('Canapé 2 places', '2-seater sofa', 'Nettoyage en profondeur de votre canapé 2 places.', 'Deep cleaning of your 2-seater sofa.', 55.00, 60, 'textile', false, 3),
  ('Canapé 3 places', '3-seater sofa', 'Nettoyage en profondeur de votre canapé 3 places.', 'Deep cleaning of your 3-seater sofa.', 70.00, 75, 'textile', false, 4),
  ('Canapé +3 places', '3+ seater sofa', 'Nettoyage en profondeur de votre grand canapé.', 'Deep cleaning of your large sofa.', 90.00, 90, 'textile', false, 5);

-- ============================================
-- Nettoyage interieur voiture - Formule Standard
-- ============================================

INSERT INTO public.services (name_fr, name_en, description_fr, description_en, price, duration_minutes, category, vehicle_type, formula, sort_order) VALUES
  ('Citadine - Standard', 'City car - Standard', 'Aspiration complète (tapis, moquettes, sièges), nettoyage du tableau de bord et surfaces intérieures, neutralisation des odeurs.', 'Complete vacuuming (mats, carpets, seats), dashboard and interior surfaces cleaning, odor neutralization.', 50.00, 60, 'voiture', 'citadine', 'standard', 10),
  ('Berline - Standard', 'Sedan - Standard', 'Aspiration complète (tapis, moquettes, sièges), nettoyage du tableau de bord et surfaces intérieures, neutralisation des odeurs.', 'Complete vacuuming (mats, carpets, seats), dashboard and interior surfaces cleaning, odor neutralization.', 60.00, 75, 'voiture', 'berline', 'standard', 11),
  ('SUV/Break - Standard', 'SUV/Estate - Standard', 'Aspiration complète (tapis, moquettes, sièges), nettoyage du tableau de bord et surfaces intérieures, neutralisation des odeurs.', 'Complete vacuuming (mats, carpets, seats), dashboard and interior surfaces cleaning, odor neutralization.', 70.00, 90, 'voiture', 'suv_break', 'standard', 12);

-- ============================================
-- Nettoyage interieur voiture - Formule Prestige
-- ============================================

INSERT INTO public.services (name_fr, name_en, description_fr, description_en, price, duration_minutes, category, vehicle_type, formula, sort_order) VALUES
  ('Citadine - Prestige', 'City car - Prestige', 'Formule standard + nettoyage en profondeur des sièges et moquettes, shampoing textile et traitement anti-tâches, traitement désodorisant complet.', 'Standard formula + deep cleaning of seats and carpets, textile shampoo and stain treatment, complete deodorizing treatment.', 70.00, 90, 'voiture', 'citadine', 'prestige', 13),
  ('Berline - Prestige', 'Sedan - Prestige', 'Formule standard + nettoyage en profondeur des sièges et moquettes, shampoing textile et traitement anti-tâches, traitement désodorisant complet.', 'Standard formula + deep cleaning of seats and carpets, textile shampoo and stain treatment, complete deodorizing treatment.', 85.00, 105, 'voiture', 'berline', 'prestige', 14),
  ('SUV/Break - Prestige', 'SUV/Estate - Prestige', 'Formule standard + nettoyage en profondeur des sièges et moquettes, shampoing textile et traitement anti-tâches, traitement désodorisant complet.', 'Standard formula + deep cleaning of seats and carpets, textile shampoo and stain treatment, complete deodorizing treatment.', 100.00, 120, 'voiture', 'suv_break', 'prestige', 15);

-- ============================================
-- Table des options complementaires
-- ============================================

CREATE TABLE IF NOT EXISTS public.service_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_fr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_fr TEXT,
  description_en TEXT,
  category TEXT NOT NULL,
  percentage_increase DECIMAL(5,2) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true
);

ALTER TABLE public.service_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view service options" ON public.service_options
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage service options" ON public.service_options
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

INSERT INTO public.service_options (name_fr, name_en, description_fr, description_en, category, percentage_increase) VALUES
  ('Traitement anti-tâches et anti-acariens', 'Anti-stain and anti-dust mite treatment', 'Protection durable contre les tâches et les acariens.', 'Long-lasting protection against stains and dust mites.', 'textile', 10.00),
  ('Nettoyage express (24h)', 'Express cleaning (24h)', 'Intervention dans les 24 heures.', 'Intervention within 24 hours.', 'textile', 20.00);
