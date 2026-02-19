import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
    console.warn('Supabase credentials are missing. Make sure to fill in .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
