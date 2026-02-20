# Debug Guide - User Sync Issues

## Understanding the Error Logs

When you visit `/dashboard`, you should see detailed logs in your terminal. Here's what to look for:

### ✅ Success Logs

```bash
✓ User already exists: user_xxxxx
```
User is already synced, no action needed.

```bash
📝 Creating new user in Supabase: user_xxxxx
✅ User created in Supabase: user_xxxxx
```
New user successfully created in Supabase.

### ❌ Error Logs

```bash
❌ Error creating user: {
  code: 'PGRST116',
  message: 'JSON object requested, multiple (or no) rows returned',
  ...
}
```
**Issue**: Table doesn't exist or wrong table name.
**Fix**: Run `supabase-schema.sql` in Supabase SQL Editor.

```bash
❌ Error creating user: {
  code: '42501',
  message: 'new row violates row-level security policy',
  ...
}
```
**Issue**: RLS policies are blocking the insert.
**Fix**: Run `supabase-schema.sql` to set up proper policies.

```bash
❌ Error creating user: {
  code: '23505',
  message: 'duplicate key value violates unique constraint',
  ...
}
```
**Issue**: User already exists (race condition).
**Fix**: This is harmless, ignore it. The user is already synced.

```bash
❌ Error creating user: {
  code: '42703',
  message: 'column "credits" does not exist',
  ...
}
```
**Issue**: Missing column in your table.
**Fix**: Run `supabase-schema.sql` to add missing columns.

## Quick Troubleshooting Steps

### Step 1: Check Your Supabase Table

1. Go to Supabase Dashboard → Table Editor
2. Click on "user" table
3. Verify these columns exist:
   - `id` (text/varchar)
   - `email` (text/varchar)
   - `name` (text/varchar)
   - `image_url` (text/varchar) - nullable
   - `credits` (integer)
   - `created_at` (timestamptz)

**If columns are missing**: Run `supabase-schema.sql`

### Step 2: Check RLS Policies

1. Go to Supabase Dashboard → Authentication → Policies
2. Look for "user" table policies
3. Should have:
   - "Users can read own data" (SELECT)
   - "Service role can insert users" (INSERT)
   - "Service role can update users" (UPDATE)

**If policies are missing**: Run `supabase-schema.sql`

### Step 3: Verify Environment Variables

Check your `.env.local` has:
```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...  # Service role key (not anon key!)
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...  # From Clerk dashboard
```

**Restart your server** after any `.env.local` changes:
```bash
npm run dev
```

### Step 4: Test the Sync

1. Clear your browser cookies/cache
2. Sign out of your app
3. Sign in again
4. Watch the terminal logs
5. Check Supabase table for new row

## Common Issues

### Issue: "Error syncing user: {}"

**Cause**: Empty error object means Supabase returned an error but without details.

**Fix**:
1. Check if `SUPABASE_SERVICE_ROLE_KEY` is set correctly
2. Run `supabase-schema.sql` to ensure table exists
3. Restart your dev server

### Issue: Hydration Error (fdprocessedid)

**Cause**: Browser extension (LastPass, password manager) adding attributes to form inputs.

**Fix**: This is harmless and doesn't affect functionality. To remove:
- Disable browser extensions temporarily
- Or add `suppressHydrationWarning` to input elements

### Issue: Webhook Not Firing

**Cause**: Clerk webhook not configured or wrong URL.

**Fix**:
1. Go to Clerk Dashboard → Webhooks
2. Add endpoint: `http://localhost:3000/api/webhooks/clerk`
3. Subscribe to: `user.created`
4. Copy signing secret to `.env.local`
5. Test using Clerk's "Send Example" feature

## Testing Checklist

- [ ] Run `supabase-schema.sql` in Supabase SQL Editor
- [ ] Verify all columns exist in "user" table
- [ ] Verify RLS policies are set up
- [ ] Check `.env.local` has all required keys
- [ ] Restart dev server: `npm run dev`
- [ ] Clear browser cache/cookies
- [ ] Sign in and watch terminal logs
- [ ] Check Supabase table for new user

## Still Having Issues?

Check the detailed error object in your terminal. The new error logs include:
- `code` - PostgreSQL error code
- `message` - Human-readable error message
- `details` - Additional context
- `hint` - Suggestion for fixing

Post the full error object when asking for help!
