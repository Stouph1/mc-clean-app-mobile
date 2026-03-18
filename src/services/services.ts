import { supabase } from '../lib/supabase';
import type { Service, ServiceOption } from '../types/database';

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('active', true)
    .order('sort_order');

  if (error) throw error;
  return data ?? [];
}

export async function getServiceOptions(category: string): Promise<ServiceOption[]> {
  const { data, error } = await supabase
    .from('service_options')
    .select('*')
    .eq('category', category)
    .eq('active', true);

  if (error) throw error;
  return data ?? [];
}
