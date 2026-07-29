# Setup checklist

**Status: live.** The site is deployed and working at `https://transparentchanges.com`,
hosted on Cloudflare Workers, backed by Supabase. This doc reflects what's actually
running, plus what to do for the remaining optional pieces (analytics, ads).

## Done already

1. **Supabase** — project created, `supabase/schema.sql` run, creating
   `founding_circle_entries`, `industry_suggestions`, and `ventures` (pre-seeded with the
   5 launch ventures).
2. **GitHub** — code lives at `github.com/ifdb314/transparentchanges`.
3. **Cloudflare Workers** — the app is deployed as a Worker named `transparentchanges`,
   using the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare) (not
   Vercel — Vercel hit an unresolved platform-side routing bug during setup, documented
   in the original conversation, so we moved to Cloudflare instead).
4. **Domain** — `transparentchanges.com` and `www.transparentchanges.com` are both bound
   to the Worker as custom domains, nameservers pointed at Cloudflare, SSL live.
5. **Secrets** — `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_USER`,
   `ADMIN_PASSWORD` are all set as encrypted Worker secrets (`wrangler secret put`, not
   in any file that's committed to git).
6. **Admin login** — `/admin` is protected by a real login form + signed session cookie
   (`app/admin/login/`, `lib/adminAuth.ts`), not HTTP Basic Auth. Cloudflare doesn't
   support the Node.js-runtime middleware Vercel would have used for Basic Auth, so this
   is the replacement — same `ADMIN_USER`/`ADMIN_PASSWORD` secrets, just a proper page
   instead of a browser popup.

## How to redeploy after future code changes

There's no auto-deploy-on-push yet (that requires connecting the repo under **Workers &
Pages → transparentchanges → Settings → Builds** in the Cloudflare dashboard, if you
want to set it up later). Until then, redeploying is one command:

```bash
cd transparentchanges-app
npm run cf:deploy
```

This rebuilds the Next.js app and pushes the new Worker version live in one step. Your
secrets stay put — you only need `wrangler secret put NAME` again if a value actually
changes.

## View your data

Go to `https://transparentchanges.com/admin` and log in with your `ADMIN_USER` /
`ADMIN_PASSWORD`. You'll see every Founding Circle pledge, every industry suggestion,
and current venture vote counts, live from Supabase.

## Google Analytics 4 (visits, visitors, page tracking)

1. Go to [analytics.google.com](https://analytics.google.com) → **Admin → Create
   Property**. Name it, set your timezone/currency, and create a **Web** data stream
   for `transparentchanges.com`.
2. Copy the **Measurement ID** shown (looks like `G-XXXXXXXXXX`).
3. Set it as a Worker secret and redeploy:
   ```bash
   printf '%s' 'G-XXXXXXXXXX' | npx wrangler secret put NEXT_PUBLIC_GA_ID
   npm run cf:deploy
   ```
   Note: since this is a `NEXT_PUBLIC_` variable, it actually needs to be present in
   `.env.local` (or `.env.production`) *at build time* for it to reach the browser — a
   Worker secret alone won't do it, because `NEXT_PUBLIC_` values get baked into the
   client bundle during `next build`, not read at request time. Add the same value to
   `.env.local` before running `npm run cf:deploy`.
4. Traffic, visits, and visitor data live in the Google Analytics dashboard itself — not
   in `/admin`, which is specifically for your Founding Circle data.

## Google Ads conversion tracking

1. Go to [ads.google.com](https://ads.google.com) → **Tools & Settings → Conversions →
   New conversion action → Website**. Name it something like "Founding Circle pledge."
2. Google shows you a **Conversion ID** (`AW-XXXXXXXXX`) and a **Conversion Label**.
3. Add both to `.env.local` as `NEXT_PUBLIC_GOOGLE_ADS_ID` and
   `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` (same build-time caveat as GA4 above), then
   `npm run cf:deploy`.
4. Every successful Founding Circle pledge now fires this conversion automatically (see
   `components/Analytics.tsx` → `trackFoundingCirclePledge`).

## Meta Pixel (Facebook & Instagram Ads)

1. Go to [business.facebook.com](https://business.facebook.com) → **Events Manager →
   Connect Data Sources → Web → Meta Pixel** → create one, name it, enter your domain.
2. Copy the **Pixel ID**, add it to `.env.local` as `NEXT_PUBLIC_META_PIXEL_ID`, then
   `npm run cf:deploy`.
3. The pixel fires `PageView` on every page automatically, and a `Lead` event on every
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
- **No auto-deploy on push** — see "How to redeploy" above. Connecting Git in the
  Cloudflare dashboard would close this gap if it's worth it to you.
