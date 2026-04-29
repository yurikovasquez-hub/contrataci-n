import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Audit log — remove after debugging
  console.log('[Supabase audit] URL:', url);
  console.log('[Supabase audit] Key length:', key?.length);
  console.log('[Supabase audit] Key start:', key?.substring(0, 30));
  console.log('[Supabase audit] Key end:', key?.substring((key?.length ?? 0) - 20));

  if (!url) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
  if (!key) throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
  _client = createClient(url, key);
  return _client;
}
