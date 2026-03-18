export type Service = {
  id: string;
  name_fr: string;
  name_en: string;
  description_fr: string | null;
  description_en: string | null;
  price: number;
  duration_minutes: number;
  image_url: string | null;
  active: boolean;
  category: 'textile' | 'voiture';
  vehicle_type: 'citadine' | 'berline' | 'suv_break' | null;
  formula: 'standard' | 'prestige' | null;
  is_quote_only: boolean;
  sort_order: number;
  created_at: string;
};

export type ServiceOption = {
  id: string;
  name_fr: string;
  name_en: string;
  description_fr: string | null;
  description_en: string | null;
  category: string;
  percentage_increase: number;
  active: boolean;
};

export type Profile = {
  id: string;
  full_name: string;
  phone: string | null;
  role: 'client' | 'admin';
  language: 'fr' | 'en';
  created_at: string;
  updated_at: string;
};

export type Booking = {
  id: string;
  user_id: string;
  service_id: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  scheduled_date: string;
  scheduled_time: string;
  address: string;
  city: string | null;
  postal_code: string | null;
  notes: string | null;
  total_price: number;
  created_at: string;
  updated_at: string;
  service?: Service;
};

export type Quote = {
  id: string;
  user_id: string;
  service_id: string | null;
  status: 'pending' | 'sent' | 'accepted' | 'rejected';
  description: string;
  address: string;
  estimated_price: number | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};
