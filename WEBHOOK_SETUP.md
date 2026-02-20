# Clerk Webhook Setup Guide

## ✅ What's Been Fixed

1. **Webhook signature verification** - Added proper Svix webhook verification for security
2. **Complete user data sync** - Now includes `email`, `name`, `image_url`, and `credits`
3. **Default credits** - New users automatically get 100 credits
4. **Error logging** - Better error messages and success confirmations

## 🔧 Setup Steps

### Step 1: Configure Clerk Webhook

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Navigate to **Webhooks** in the left sidebar
4. Click **"Add Endpoint"**
5. Enter your webhook URL:
   - **Development**: `http://localhost:3000/api/webhooks/clerk`
   - **Production**: `https://yourdomain.com/api/webhooks/clerk`

6. Select the event to subscribe to:
   - ✅ **user.created** (Required)

7. Click **"Create"**

### Step 2: Get Your Webhook Secret

1. After creating the webhook, click on it to view details
2. Copy the **Signing Secret** (starts with `whsec_...`)
3. Open your `.env.local` file
4. Replace `whsec_your_webhook_secret_here` with your actual secret:

```env
CLERK_WEBHOOK_SECRET=whsec_actual_secret_from_clerk_dashboard
```

### Step 3: Restart Your Development Server

```bash
# Stop your current server (Ctrl+C)
npm run dev
```

## 🧪 Testing the Webhook

### Option 1: Create a New Test User

1. Go to `http://localhost:3000/sign-up`
2. Create a new account
3. Check your Supabase database - you should see the new user!

### Option 2: Use Clerk Dashboard Test Event

1. In Clerk Dashboard → Webhooks → Your Endpoint
2. Click **"Testing"** tab
3. Select **"user.created"** event
4. Click **"Send Example"**
5. Check the response and your Supabase table

## 🔍 Troubleshooting

### Webhook Not Firing?

1. **Check webhook URL is correct** in Clerk dashboard
2. **Verify CLERK_WEBHOOK_SECRET** is set in `.env.local`
3. **Check server logs** for error messages
4. **Test webhook manually** using Clerk dashboard's test feature

### Users Still Not Syncing?

1. **Clear browser cache** and try signing up again
2. **Check Supabase RLS policies** - ensure the service role can insert
3. **Verify environment variables** are loaded (restart server)
4. **Check console logs** in your terminal for error messages

### Database Errors?

If you see database errors, verify your `user` table has these columns:
- `id` (text/varchar) - Primary Key
- `email` (text/varchar)
- `name` (text/varchar)
- `image_url` (text/varchar) - Can be null
- `credits` (integer) - Default: 100
- `created_at` (timestamptz) - Default: now()

## 📊 How It Works

```
User Signs Up
    ↓
Clerk creates user
    ↓
Clerk sends webhook to your endpoint
    ↓
Your API verifies signature (security)
    ↓
Your API inserts user into Supabase
    ↓
User can now use the app with 100 credits!
```

## 🎯 Automatic Sync Architecture

The app uses a **two-tier sync approach**:

1. **Primary: Clerk Webhook (Real-time)**
   - When user signs up, Clerk immediately sends webhook
   - User is synced to Supabase instantly
   - Most reliable method

2. **Fallback: Server-side Sync (On Dashboard Access)**
   - Dashboard layout (`/dashboard/layout.tsx`) automatically syncs users
   - Runs on server before rendering dashboard
   - Ensures users are synced even if webhook fails
   - No client-side calls needed

This architecture ensures **100% user sync** through webhook + automatic fallback!

## 🚀 Production Deployment

When deploying to production:

1. Update webhook URL in Clerk Dashboard to your production domain
2. Add `CLERK_WEBHOOK_SECRET` to your production environment variables
3. Ensure your production server can receive POST requests at `/api/webhooks/clerk`
4. Test by creating a new production user

---

**Need help?** Check the server logs when signing up a new user. You should see:
- `✅ User created in Supabase: user_xxxxx` (success)
- Or error messages explaining what went wrong
