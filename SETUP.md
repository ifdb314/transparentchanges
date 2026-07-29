# Setup checklist

Everything in this repo is built and wired up. What's left is account-level setup that
only you can do — creating accounts, generating keys, and connecting them together.
Follow this in order; each section says exactly what to click.

## 1. Supabase (the database)

1. Go to [supabase.com](https://supabase.com) → sign up (free tier is plenty to start) →
   **New Project**. Pick any name/region, set a database password (save it somewhere —
   you won't need it day-to-day, but you'll want it if you ever connect a SQL client).
2. Once the project finishes provisioning, go to **SQL Editor** → **New query**.
3. Open `supabase/schema.sql` in this repo, paste its entire contents into the editor,
   and click **Run**. This creates three tables: `founding_circle_entries`,
   `industry_suggestions`, and `ventures` (pre-seeded with the 5 launch ventures).
4. Go to **Project Settings → API**. You need two values from this page:
   - **Project URL** → this is `SUPABASE_URL`
   - **service_role** key (under "Project API keys" — click "reveal") → this is
     `SUPABASE_SERVICE_ROLE_KEY`

   The service_role key bypasses your database's row-level security — never put it in
   client-side code or commit it to git. It's only ever read on the server (see
   `lib/supabase.ts`), which is exactly why we're using it here.

## 2. Push this repo to GitHub

If this project isn't already in your existing GitHub repo:

```bash
cd transparentchanges-app
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

If you already have a repo, copy this project's files into it, commit, and push as you
normally would.

## 3. Vercel (hosting)

1. Go to [vercel.com](https://vercel.com) → sign in with your GitHub account →
   **Add New… → Project** → import the repo you just pushed.
2. Vercel auto-detects Next.js — leave the build settings as default.
3. Before clicking Deploy, open **Environment Variables** and add:

   | Name | Value |
   |---|---|
   | `SUPABASE_URL` | from step 1 |
   | `SUPABASE_SERVICE_ROLE_KEY` | from step 1 |
   | `ADMIN_USER` | pick a username, e.g. `justin` |
   | `ADMIN_PASSWORD` | pick a long random password (this gates `/admin`) |
   | `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` (your real domain, step 4) |

   Leave the analytics/ads variables blank for now — step 6 covers those.
4. Click **Deploy**. In a minute or two you'll have a live `*.vercel.app` URL.

## 4. Connect your existing domain

1. In the Vercel project → **Settings → Domains** → add your domain.
2. Vercel will show you a DNS record to add (usually an `A` record pointing at
   `76.76.21.21`, or a `CNAME` for a subdomain). Add that record wherever your domain is
   registered (Namecheap, GoDaddy, Google Domains, Cloudflare, etc.).
3. DNS can take a few minutes to a few hours to propagate. Vercel's dashboard will show
   a green checkmark once it's live, and issues a free SSL certificate automatically.

## 5. View your data

Once deployed, go to `https://yourdomain.com/admin` and log in with the `ADMIN_USER` /
`ADMIN_PASSWORD` you set in step 3 (your browser will show a standard login prompt —
that's HTTP Basic Auth, not a custom login page). You'll see every Founding Circle
pledge, every industry suggestion, and current venture vote counts, live from Supabase.

## 6. Google Analytics 4 (visits, visitors, page tracking)

1. Go to [analytics.google.com](https://analytics.google.com) → **Admin → Create
   Property**. Name it, set your timezone/currency, and create a **Web** data stream
   for your domain.
2. Copy the **Measurement ID** shown (looks like `G-XXXXXXXXXX`).
3. In Vercel → **Settings → Environment Variables**, add `NEXT_PUBLIC_GA_ID` with that
   value, then redeploy (**Deployments → ⋯ → Redeploy** on the latest one).
4. Traffic, visits, and visitor data live in the Google Analytics dashboard itself
   (analytics.google.com) — not in `/admin`. That's the right specialized tool for that
   job; `/admin` is specifically for your Founding Circle data.

## 7. Google Ads conversion tracking

1. Go to [ads.google.com](https://ads.google.com) → create an account if you don't have
   one → **Tools & Settings → Conversions → New conversion action → Website**.
2. Name it something like "Founding Circle pledge," set the value/category however you
   like, and save. Google will show you a **Conversion ID** (`AW-XXXXXXXXX`) and a
   **Conversion Label**.
3. In Vercel, add:
   - `NEXT_PUBLIC_GOOGLE_ADS_ID` = the `AW-XXXXXXXXX` value
   - `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` = `AW-XXXXXXXXX/AbC-D_efG-h12` (the full
     send_to string Google shows you)
4. Redeploy. Every successful Founding Circle pledge now fires this conversion
   automatically (see `components/Analytics.tsx` → `trackFoundingCirclePledge`).

## 8. Meta Pixel (Facebook & Instagram Ads)

1. Go to [business.facebook.com](https://business.facebook.com) → **Events Manager →
   Connect Data Sources → Web → Meta Pixel** → create one, name it, enter your domain.
2. Copy the **Pixel ID** (a long number).
3. In Vercel, add `NEXT_PUBLIC_META_PIXEL_ID` with that value, and redeploy.
4. The pixel fires `PageView` on every page automatically, and a `Lead` event on every
   successful Founding Circle pledge.

## Known limitations, on purpose

This was built to be lightweight, per your request — a few honest tradeoffs:

- **Upvotes** are limited to one-per-browser via `localStorage`, not a real account
  system. Someone using a different browser or clearing their storage could vote again.
  Fine for gauging interest at this stage; not abuse-proof.
- **The Founding Circle map** places real pledgers at a stable-but-arbitrary position
  within the U.S. or World outline (not real geocoding) — the page copy says as much.
  The "World" view is still a simplified region grid, not a full world map.
- **No email capture / no confirmation emails** are sent yet. Pledges save straight to
  the database with no follow-up. Worth adding once you're ready to actually communicate
  with your Founding Circle (Supabase has a built-in way to trigger emails via Edge
  Functions, or you could bolt on something like Resend).
