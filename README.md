# thennavan-m.com

Personal academic website of Dr Thennavan M, built with [Astro](https://astro.build).
It is a static site: no database, no server, nothing to patch. Pages are plain HTML and
CSS, so they load fast on any connection and can be hosted free.

## What's inside

```
src/data/site.ts        ← all the text on the site (edit this file)
src/lib/views.ts        ← the markup of every page, built from site.ts
src/lib/hysteresis.ts   ← the Bouc–Wen model that draws the damper loop plot
src/layouts/Base.astro  ← page head, search-engine metadata, header and footer
src/pages/              ← one small file per page: home, research, projects, publications,
                          teaching, cv, contact, 404
src/styles/global.css   ← colours, fonts and layout
public/                 ← files served as-is: favicon, social image, robots.txt,
                          and your photo, logos and CV once you add them
```

## Editing your content

Open `src/data/site.ts`. Everything a visitor reads is there: biography, research areas,
experimental work and its figures, projects, papers, patents, courses, news, positions and
contact details. Lists appear in the order written, so put the newest item first. You never
need to edit the page files to add a paper, a project or a course.

Images live in `public/images/`: your portrait is `thennavan.jpg`, and the research figures
are in `public/images/research/`. To add a figure, save it there and add an entry to the
`figures` list of the right item in `experiments`. Visitors can click any figure to see it
full size.

### Before you go live

1. **CV.** Save your CV as `public/Thennavan_CV.pdf` and set `cv: '/Thennavan_CV.pdf'`.
   The "Download CV" buttons appear once this is set.
2. **Photo.** The current portrait is 320 px wide. A larger square photo (600 px or more)
   will look sharper on high-resolution screens; save it over `public/images/thennavan.jpg`.
3. **Check the details**, especially the Naples dates (Oct 2024 – Jan 2026) and the
   IIT Roorkee project details.

### Changing the colours

The site uses navy and gold on a white page. All colours are set once at the top of
`src/styles/global.css`: `--navy` for the header, footer and headings, `--gold` for the
accent lines, and `--gold-text` for dates and labels. Change those lines to recolour the
whole site.

## Running it on your computer

You need [Node.js](https://nodejs.org) version 22 (the LTS download).

```bash
npm install        # once, downloads Astro
npm run dev        # live preview at http://localhost:4321, updates as you save
npm run build      # produces the finished site in the dist/ folder
```

## Publishing

The site is hosted free on GitHub Pages at your own domain, www.thennavan-m.com, bought at
Namecheap. Every time you push a change, the site rebuilds and republishes itself in about a
minute.

### 1. Buy the domain

In Namecheap, search for `thennavan-m.com`, buy it and switch on auto-renew. Under
**Domain List → Manage → Nameservers**, keep **Namecheap BasicDNS**.

### 2. Put the project on GitHub

1. Create a free account at github.com and install GitHub Desktop.
2. In GitHub Desktop, add this folder as a repository and publish it as a **public**
   repository named `<your-github-username>.github.io`. With that name the site also works at
   `https://<your-github-username>.github.io` while you test it.
3. On github.com, open the repository's **Settings → Pages** and set **Source** to
   **GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds and publishes the
   site. Its progress shows under the **Actions** tab.

### 3. Point thennavan-m.com at it (Namecheap)

1. In Namecheap, open **Domain List → Manage → Advanced DNS** for thennavan-m.com and delete
   any parking records Namecheap added (usually a CNAME for `www` and a URL redirect for `@`).
2. Add these records:

   | Type | Host | Value |
   | --- | --- | --- |
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | `<your-github-username>.github.io.` |

3. Back in GitHub **Settings → Pages**, enter `www.thennavan-m.com` as the custom domain
   (the `public/CNAME` file already holds it). Once the DNS check passes, which can take a few
   hours, tick **Enforce HTTPS**.

### 4. Retire the old site and update your links

Unpublish the old Google Site once the new one is live. Then update the website link on your
Google Scholar, ORCID, ResearchGate and LinkedIn profiles, your email signature and your CV.

If you also renew the old domain, drmthennav.com, you can keep its old links working: in its
**Advanced DNS**, delete the Google Sites records and add a **URL Redirect Record** for host
`@` and for host `www`, both pointing to `https://www.thennavan-m.com` (permanent, 301).

### Other hosts

The site also runs on Cloudflare Pages or Netlify (build command `npm run build`, output
folder `dist`).

## Search engines

Each page carries a description, a canonical address and a social-sharing image
(`public/og.png`). The home page also includes structured data that links the site to your
Google Scholar, ORCID, Scopus and ResearchGate profiles, which helps search engines tell you
apart from other people named Thennavan. `robots.txt` allows all crawlers and points to
`/sitemap.xml`. After launch, add the site in
[Google Search Console](https://search.google.com/search-console) and submit the sitemap.

## Updating Astro

```bash
npx @astrojs/upgrade
```
