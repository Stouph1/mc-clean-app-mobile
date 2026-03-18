-- ============================================
-- McClean - Schema initial de la base de donnees
-- ============================================

-- Table des profils utilisateurs (extension de auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  language TEXT NOT NULL DEFAULT 'fr' CHECK (language IN ('fr', 'en')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des services proposes
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_fr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_fr TEXT,
  description_en TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  image_url TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des reservations / commandes
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES public.services(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  address TEXT NOT NULL,
  city TEXT,
  postal_code TEXT,
  notes TEXT,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des devis
CREATE TABLE public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'accepted', 'rejected')),
  description TEXT NOT NULL,
  address TEXT NOT NULL,
  estimated_price DECIMAL(10,2),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des paiements
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  stripe_payment_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des tampons de fidelite
CREATE TABLE public.loyalty_stamps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id),
  stamp_number INTEGER NOT NULL,
  cycle INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des recompenses de fidelite utilisees
CREATE TABLE public.loyalty_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reward_type TEXT NOT NULL CHECK (reward_type IN ('discount_30', 'free_wash')),
  booking_id UUID REFERENCES public.bookings(id),
  used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des disponibilites / creneaux
CREATE TABLE public.availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true
);

-- Table des jours bloques (conges, etc.)
CREATE TABLE public.blocked_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocked_date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des zones d'intervention
CREATE TABLE public.zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  postal_codes TEXT[] NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_stamps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zones ENABLE ROW LEVEL SECURITY;

-- Profiles : chacun voit son profil, admin voit tout
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admin can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Services : tout le monde peut voir les services actifs
CREATE POLICY "Anyone can view active services" ON public.services
  FOR SELECT USING (active = true);

CREATE POLICY "Admin can manage services" ON public.services
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Bookings : client voit ses propres commandes, admin voit tout
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admin can manage all bookings" ON public.bookings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Quotes : client voit ses devis, admin voit tout
CREATE POLICY "Users can view own quotes" ON public.quotes
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create quotes" ON public.quotes
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admin can manage all quotes" ON public.quotes
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Payments : client voit ses paiements, admin voit tout
CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admin can manage all payments" ON public.payments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Loyalty : client voit ses tampons, admin voit tout
CREATE POLICY "Users can view own stamps" ON public.loyalty_stamps
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admin can manage all stamps" ON public.loyalty_stamps
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can view own rewards" ON public.loyalty_rewards
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admin can manage all rewards" ON public.loyalty_rewards
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Availability et zones : tout le monde peut voir
CREATE POLICY "Anyone can view availability" ON public.availability
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage availability" ON public.availability
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Anyone can view blocked dates" ON public.blocked_dates
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage blocked dates" ON public.blocked_dates
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Anyone can view zones" ON public.zones
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage zones" ON public.zones
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- Trigger : creer un profil automatiquement a l'inscription
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, role, language)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'client'),
    'fr'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- Donnees initiales
-- ============================================

-- Services McClean
INSERT INTO public.services (name_fr, name_en, description_fr, description_en, price, duration_minutes) VALUES
  ('Nettoyage intérieur voiture', 'Car interior cleaning', 'Nettoyage complet de l''intérieur de votre véhicule : sièges, tapis, tableau de bord, vitres.', 'Complete interior cleaning of your vehicle: seats, carpets, dashboard, windows.', 49.90, 90),
  ('Nettoyage canapé', 'Sofa cleaning', 'Nettoyage en profondeur de votre canapé, élimination des taches et odeurs.', 'Deep cleaning of your sofa, stain and odor removal.', 59.90, 60),
  ('Nettoyage tapis', 'Carpet cleaning', 'Nettoyage professionnel de vos tapis, redonner éclat et fraîcheur.', 'Professional carpet cleaning, restore brightness and freshness.', 39.90, 45);

-- Zones d'intervention : Ile-de-France
INSERT INTO public.zones (name, postal_codes) VALUES
  ('Paris (75)', ARRAY['75001','75002','75003','75004','75005','75006','75007','75008','75009','75010','75011','75012','75013','75014','75015','75016','75017','75018','75019','75020']),
  ('Seine-et-Marne (77)', ARRAY['77000','77100','77110','77120','77130','77140','77150','77160','77170','77176','77180','77185','77190','77200','77210','77220','77230','77240','77250','77260','77270','77280','77290','77300','77310','77320','77330','77340','77350','77360','77370','77380','77390','77400','77410','77420','77430','77440','77450','77460','77470','77480','77490','77500','77510','77515','77520','77550','77580','77600','77610','77620','77630','77640','77650','77680','77700','77720','77760','77780','77790','77800','77850','77860','77870','77880','77890','77950']),
  ('Yvelines (78)', ARRAY['78000','78100','78110','78120','78130','78140','78150','78160','78170','78180','78190','78200','78210','78220','78230','78240','78250','78260','78270','78280','78290','78300','78310','78320','78330','78340','78350','78360','78370','78380','78390','78400','78410','78420','78430','78440','78450','78460','78470','78480','78490','78500','78510','78520','78530','78540','78550','78560','78570','78580','78590','78600','78610','78620','78630','78640','78650','78660','78670','78680','78690','78700','78710','78720','78730','78740','78750','78760','78770','78780','78790','78800','78850','78860','78870','78880','78890','78910','78920','78930','78940','78950','78955','78960','78970','78980','78990']),
  ('Essonne (91)', ARRAY['91000','91100','91110','91120','91130','91140','91150','91160','91170','91180','91190','91200','91210','91220','91230','91240','91250','91260','91270','91280','91290','91300','91310','91320','91330','91340','91350','91360','91370','91380','91390','91400','91410','91420','91430','91440','91450','91460','91470','91480','91490','91510','91520','91530','91540','91560','91570','91580','91590','91600','91610','91620','91630','91640','91650','91670','91680','91700','91710','91720','91730','91740','91750','91760','91770','91780','91790','91800','91810','91830','91860','91940','91950']),
  ('Hauts-de-Seine (92)', ARRAY['92000','92100','92110','92120','92130','92140','92150','92160','92170','92190','92200','92210','92220','92230','92240','92250','92260','92270','92280','92290','92300','92310','92320','92330','92340','92350','92360','92370','92380','92390','92400','92410','92420','92430','92500','92600','92700','92800']),
  ('Seine-Saint-Denis (93)', ARRAY['93100','93110','93120','93130','93140','93150','93160','93170','93190','93200','93210','93220','93230','93240','93250','93260','93270','93290','93300','93310','93320','93330','93340','93350','93360','93370','93380','93390','93400','93410','93420','93430','93440','93450','93460','93470','93480','93490','93500','93600','93700','93800']),
  ('Val-de-Marne (94)', ARRAY['94000','94100','94110','94120','94130','94140','94150','94160','94170','94190','94200','94210','94220','94230','94240','94250','94260','94270','94290','94300','94310','94320','94340','94350','94360','94370','94380','94390','94400','94410','94420','94430','94440','94450','94460','94470','94480','94490','94500','94510','94520','94550','94600','94700','94800']),
  ('Val-d''Oise (95)', ARRAY['95000','95100','95110','95120','95130','95140','95150','95160','95170','95180','95190','95200','95210','95220','95230','95240','95250','95260','95270','95280','95290','95300','95310','95320','95330','95340','95350','95360','95370','95380','95390','95400','95410','95420','95430','95440','95450','95460','95470','95480','95490','95500','95510','95520','95530','95540','95550','95560','95570','95580','95590','95600','95610','95620','95630','95640','95650','95660','95670','95680','95690','95700','95710','95720','95750','95760','95770','95800','95810','95820','95830','95840','95850','95860','95870','95880']);

-- Disponibilites par defaut (lundi a samedi, 8h-18h)
INSERT INTO public.availability (day_of_week, start_time, end_time) VALUES
  (1, '08:00', '18:00'),
  (2, '08:00', '18:00'),
  (3, '08:00', '18:00'),
  (4, '08:00', '18:00'),
  (5, '08:00', '18:00'),
  (6, '09:00', '17:00');
bioPCPC2014