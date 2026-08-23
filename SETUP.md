# PMkisanOnline - Setup & Admin Guide

## 1. Install & configure

```bash
npm install
cp .env.local.example .env.local
```

Fill in `.env.local` with your Supabase project's keys (Supabase dashboard ->
Project Settings -> API) and your Anthropic API key:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...      # Settings -> API -> service_role (secret!)
ANTHROPIC_API_KEY=...              # for the AI-assisted scheme form
```

## 2. Create the database tables

Open your Supabase project -> **SQL Editor** -> **New Query**, paste the
contents of `supabase/schema.sql`, and click **Run**. This creates the
`states` and `posts` tables, seeds all 28 states, sets up public read
access, and creates a storage bucket for scheme images. Without this step
the site will run but show no real data, and the admin panel's "Publish
Scheme" button will fail.

## 3. Create your admin login

There's no public sign-up form on purpose - only you (the site owner)
should be able to post schemes. Create your own login directly in Supabase:

1. Supabase dashboard -> **Authentication** -> **Users** -> **Add user**
2. Enter your email + a password, and confirm the user (or enable
   "auto confirm" for new users in Authentication -> Settings).
3. That's it - this email/password is now your admin login.

## 4. How to post a scheme (as the owner)

1. Run the app (`npm run dev`) and go to `/admin`.
2. Log in with the email/password you created in step 3.
3. Click **Add Scheme** in the sidebar.
4. Either:
   - Paste the raw scheme announcement text into the **AI-Assisted Draft**
     box and click **Auto-fill with AI** - it uses Claude to extract the
     title, benefit, eligibility, documents, etc. into the form for you, or
   - Fill the form in manually (title, category, benefit, last date,
     summary, eligibility, documents, how to apply).
5. Click **Publish Scheme**. It's saved to Supabase and immediately appears
   on the public site (Home, Central/State Schemes, Latest).
6. To edit or delete a scheme later, go to **All Schemes** in the sidebar.

## 5. Deploying

Deploy to Vercel (or any Next.js host) and set the same environment
variables from step 1 in your hosting provider's dashboard. Never expose
`SUPABASE_SERVICE_ROLE_KEY` or `ANTHROPIC_API_KEY` to the browser - they
must stay server-only env vars (this is already how the code is written).
