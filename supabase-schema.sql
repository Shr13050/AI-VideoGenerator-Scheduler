-- Supabase User Table Schema
-- Run this in your Supabase SQL Editor to ensure your table is set up correctly

-- Create the user table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user (
    id TEXT PRIMARY KEY,  -- Clerk user ID
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    image_url TEXT,
    credits INTEGER NOT NULL DEFAULT 100,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add columns if they're missing (safe to run even if they exist)
DO $$
BEGIN
    -- Add image_url if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'user' AND column_name = 'image_url'
    ) THEN
        ALTER TABLE public.user ADD COLUMN image_url TEXT;
    END IF;

    -- Add credits if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'user' AND column_name = 'credits'
    ) THEN
        ALTER TABLE public.user ADD COLUMN credits INTEGER NOT NULL DEFAULT 100;
    END IF;

    -- Add created_at if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'user' AND column_name = 'created_at'
    ) THEN
        ALTER TABLE public.user ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
    END IF;
END $$;

-- Enable Row Level Security (RLS)
ALTER TABLE public.user ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own data" ON public.user;
DROP POLICY IF EXISTS "Service role can insert users" ON public.user;
DROP POLICY IF EXISTS "Service role can update users" ON public.user;

-- Policy: Allow users to read their own data
CREATE POLICY "Users can read own data" ON public.user
    FOR SELECT
    USING (auth.uid()::text = id);

-- Policy: Allow service role to insert users (for webhook)
CREATE POLICY "Service role can insert users" ON public.user
    FOR INSERT
    WITH CHECK (true);

-- Policy: Allow service role to update users
CREATE POLICY "Service role can update users" ON public.user
    FOR UPDATE
    USING (true);

-- Grant necessary permissions
GRANT ALL ON public.user TO service_role;
GRANT SELECT ON public.user TO authenticated;

-- Verify the schema
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'user'
    AND table_schema = 'public'
ORDER BY ordinal_position;
