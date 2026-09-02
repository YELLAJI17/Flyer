# Candela Technologies — Network X 2026 (Vienna) meeting scheduler

A single-page site for booking meetings with Candela at Network X 2026
(VIECON, Vienna, 13–15 October 2026). Submissions are written straight
to a Google Sheet — no backend/database needed.

Files:
- `index.html` — the whole site (HTML/CSS/JS in one file)
- `apps-script.gs` — the Google Apps Script that receives form posts and writes them to a Sheet
- `README.md` — this file

## 1. Connect the form to a Google Sheet (~5 minutes)

1. Create a new Google Sheet, e.g. **"Network X 2026 – Meeting Requests"**.
2. In the Sheet, go to **Extensions → Apps Script**.
3. Delete the placeholder code and paste in the contents of `apps-script.gs`.
4. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, then click through Google's permission prompts (it'll warn you it's an unverified app — that's expected for a personal script; click **Advanced → Go to project (unsafe) → Allow**).
6. Copy the **Web app URL** it gives you (ends in `/exec`).
7. Open `index.html`, find this line near the bottom:
   ```js
   var SCRIPT_URL = "REPLACE_WITH_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";
   ```
   and paste your URL in between the quotes.

Every submission will now append a row to the first tab of the sheet, with
a header row created automatically. You can add things like a "Status"
column, conditional formatting, or a Zapier/Sheets-to-Slack notification
on top of this without touching the site.

**Note:** if you ever edit and re-deploy the Apps Script, choose
**"New deployment"** again (or manage existing deployments) — editing
the code alone doesn't update a live `/exec` URL.

## 2. Fill in the two placeholders

- **Booth number** — search `TBA` in `index.html` (in the "Find us at
  VIECON" section) and replace it once you have a booth assignment.
- **SCRIPT_URL** — from step 1 above.

## 3. Deploy

### Option A — Vercel (recommended, free)
1. Push this folder to a GitHub repo (or drag-and-drop it into Vercel's
   dashboard under "Add New… → Project → Deploy" without git).
2. In Vercel: **Add New Project**, import the repo, framework preset
   **"Other"** (it's static HTML, no build step needed).
3. Deploy. You'll get a `*.vercel.app` URL immediately.
4. To use your own domain (e.g. `networkx2026.candelatech.com`), go to
   the project's **Settings → Domains**, add the subdomain, and add the
   CNAME record it gives you at whoever manages candelatech.com's DNS.

### Option B — Host directly on candelatech.com
Drop `index.html` into the same web root as the rest of the site (e.g.
as `/networkx2026/index.html`) via whatever method you currently use to
publish the site (FTP/cPanel/etc.). No build step or server-side code
is required — it's a static file.

## 4. Test it
Open the deployed page, submit the form with test data, and confirm a
row appears in the Google Sheet within a few seconds.
