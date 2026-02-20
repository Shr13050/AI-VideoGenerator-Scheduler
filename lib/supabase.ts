import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client for public usage (respects RLS)
// This is safe to use on both client and server
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client for admin usage (bypasses RLS)
// This SHOULD ONLY be used on the server.
// We use a function or a getter to ensure it's not initialized with a missing key on the client.
export const getSupabaseAdmin = () => {
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseServiceKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing. This client can only be used on the server.');
    }
    return createClient(supabaseUrl, supabaseServiceKey);
};
