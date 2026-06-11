# Publishing emirhanaltuner.com — Step-by-Step

Your portfolio is a set of static files. Hosting it = putting those files in a
GitHub repository, turning on GitHub Pages, then pointing your GoDaddy domain at it.

You do this **once**. After that, "updating the site" = edit content → push to GitHub.

---

## What gets published

Every file in this project goes up together. The important ones:

- `Portfolio.html` — the page itself (this becomes your homepage)
- `*.jsx` — the code for the site
- `image-slot.js`, `tweaks-panel.jsx`
- `atelier-content.state.json` — all your text & layouts
- `image-slots.state.json` — your images (dropped photos, base64-encoded)
- `_ds/`, `images/` — fonts and static assets

> GitHub Pages serves `index.html` by default. So either rename
> `Portfolio.html` → `index.html`, OR keep the name and your URL becomes
> `emirhanaltuner.com/Portfolio.html`. **Recommended: rename to `index.html`.**

---

## Part 1 — Get the files onto GitHub

### Option A — GitHub website (no command line, easiest)

1. Go to **github.com** and sign in (create a free account if you don't have one).
2. Click **+** (top right) → **New repository**.
3. Name it `portfolio` (any name works). Set it to **Public**. Click **Create repository**.
4. On the new repo page, click **uploading an existing file**.
5. Download this whole project as a zip (Download button in this tool), unzip it,
   then drag **all the files and folders** into the GitHub upload box.
6. Click **Commit changes**.

### Option B — Git command line (faster for future updates)

```bash
cd /path/to/your/portfolio-folder
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/portfolio.git
git push -u origin main
```

---

## Part 2 — Turn on GitHub Pages

1. In your repo, go to **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)**. Click **Save**.
4. Wait ~1 minute. A box at the top will show your live URL:
   `https://<YOUR-USERNAME>.github.io/portfolio/`
5. Open it — your site should be live (on the github.io address for now).

---

## Part 3 — Connect your GoDaddy domain (emirhanaltuner.com)

### 3a. Tell GitHub about the domain

1. Repo → **Settings** → **Pages** → **Custom domain**.
2. Type `emirhanaltuner.com` and click **Save**.
   (This creates a `CNAME` file in your repo — leave it there.)

### 3b. Set the DNS records at GoDaddy

1. Log in to **GoDaddy** → **My Products** → next to your domain click **DNS**
   (or **Manage DNS**).
2. **Delete** any existing "Parked" / forwarding A records pointing at GoDaddy.
3. **Add these four A records** (Type: A, Name: `@`, point to each IP, TTL 1 hour):

   | Type | Name | Value           |
   |------|------|-----------------|
   | A    | @    | 185.199.108.153 |
   | A    | @    | 185.199.109.153 |
   | A    | @    | 185.199.110.153 |
   | A    | @    | 185.199.111.153 |

4. **Add one CNAME record** so `www` also works:

   | Type  | Name | Value                        |
   |-------|------|------------------------------|
   | CNAME | www  | `<YOUR-USERNAME>.github.io`  |

5. Save. DNS changes can take anywhere from 15 minutes to a few hours to spread.

### 3c. Turn on HTTPS

1. Back at GitHub → **Settings** → **Pages**. Wait until the DNS check passes
   (green checkmark next to your domain).
2. Tick **Enforce HTTPS**. Now `https://emirhanaltuner.com` is secure.

---

## Part 4 — Updating the site later (your "control panel")

1. Open this project in the editor (this tool) — your edit mode is here.
2. Make changes: edit text, drop images, mark projects published/draft, etc.
   They save into `atelier-content.state.json` and `image-slots.state.json`.
3. Re-upload those changed files to GitHub (Option A: drag them into the repo
   again; Option B: `git add . && git commit -m "update" && git push`).
4. GitHub Pages rebuilds in about a minute. Refresh your site to see it.

> The live public site is **view-only** for visitors — the editing bridge only
> works inside this editor, so nobody can change your content on the web.

---

## Good-to-know caveats

- **Fonts:** the site currently falls back to *Space Grotesk* (free). To use the
  licensed *Founders Grotesk*, drop the `.otf` files into the path the CSS expects.
  Otherwise leave it — Space Grotesk looks clean and is fully licensed for web.
- **Image file size:** images live inside `image-slots.state.json`. Currently ~12 MB
  (well within GitHub's limits). If you keep adding large photos and it grows past
  ~40 MB, ask to split it per-project for faster publishes.
- **Load speed:** the site compiles itself in the visitor's browser (fine for a
  portfolio, just a beat slower on first load). If you ever want it instant, we can
  pre-build it — not necessary now.
