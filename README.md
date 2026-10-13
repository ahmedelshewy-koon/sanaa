# Sanaa Landing Page

Arabic, responsive landing page implemented from the supplied Figma design and updated `Desktop - 5.svg` export. Real HTML text, CSS layouts and JavaScript interactions; the page is not a flattened image.

The hero uses the supplied six-second `hero.mp4` video as a muted, looping background. `hero.png` remains visible while the video loads or if playback is unavailable. Visitors who prefer reduced motion see the still image.

The supplied `Sana_BeSanaa_4K.mp4` opens as a full-screen welcome video and closes when it finishes or when the visitor selects **تخطي الفيديو**. The page requests autoplay with sound. Browsers may block audible autoplay, so the video continues muted with a button to enable sound; a visitor gesture may be required.

## Run

Requires Node.js 18 or later. No dependencies or installation step.

```bash
npm run dev
```

Open http://localhost:5173. You can also open `index.html` directly.

## Build

```bash
npm run build
npm run preview
```

Deploy `dist/` to any static host. Relative asset paths support hosting in a subdirectory, including GitHub Pages. For Vercel or Netlify, use `npm run build` and output directory `dist`.

## Structure

- `index.html`: semantic Arabic sections, accessible dialogs, navigation and inquiry form.
- `styles.css`: source colors, typography, desktop layout and responsive breakpoints.
- `app.js`: content, pricing selection, mobile menu, preview dialogs and inquiry download.
- `hr-demo.html`, `hr-demo.css`, `hr-demo.js`: interactive HR preview shown in a compact modal over the landing page, with a blurred backdrop. Its dashboard, employees, attendance, leave requests and employee portal use illustrative local data. Employee search and request filtering work without a backend.
- `tasks-demo.html`, `tasks-demo.css`, `tasks-demo.js`: matching interactive Tasks preview with a dashboard, projects, searchable and filterable task list, work board and personal tasks. All records are illustrative local data.
- `crm-demo.html`, `crm-demo.css`, `crm-demo.js`: matching interactive CRM preview with a dashboard, searchable customer directory, filterable sales opportunities, activities and reports. All records are illustrative local data.
- `erp-demo.html`, `erp-demo.css`, `erp-demo.js`: matching interactive ERP preview with a dashboard, sales, purchases, inventory, accounts and financial reports. Lists can be searched and filtered using illustrative local data.
- `public/assets/`: local original images and decorative SVG assets from the provided export.
- `scripts/`: dependency-free local server and static build.

## Design source

https://www.figma.com/design/weDhvLkw6rdYfR5vwjp54Z/?node-id=300-231

The uploaded export provides all original image fills. Decorative icons and laptop illustrations reuse the exported vectors without redrawing. Product dashboard previews use the same CRM dashboard image across four cards because that is what the supplied design contains. Original artwork spells the Latin logo `SANA`; the project name uses `Sanaa`. Artwork was preserved unchanged.

Alexandria is bundled locally under `public/fonts/`, including its SIL Open Font License. Images, icons and fonts work offline; there are no temporary Figma asset URLs or third-party runtime dependencies.

## Production integration

This is a front-end landing page. It does not implement authentication, a live dashboard, payment processing or a contact backend. The dashboard button opens the original design preview. The account icon opens system links.

**Pricing comes from Sana.** `app.js` reads the published plans from Sana's public endpoint `GET /api/public/plans` (on this site, since `sanaasystems.com/api` reaches Sana's server). Once they load, the section shows Sana's own pricing cards: one monthly / yearly switch (with the yearly saving), each product tab lists that system's own plans and then the bundles that include it, the "most popular" plan is framed, and each card shows its price, trial days and features with its own button. That button opens Sana at `https://app.sanaasystems.com/?plan=<id>&cycle=monthly|yearly&system=crm|hr|erp`, which signs the visitor up or in and opens that plan's subscription step. The design's summary bar and single **اشترك** button are hidden in this mode. Change plans in Sana's admin; the page needs no edit. Addresses are in `config` at the top of `app.js`; served from `localhost`, they point at a local Sana (`http://localhost:3010` API, `http://localhost:5180` app).

If Sana does not answer, the design's pricing stays exactly as supplied (the same complete-platform plan four times at **549 SAR/month**, **اشترك** opens the contact form). A tab with no plans in Sana (Tasks today) shows one card leading to the contact form, as does a plan without a price.

The contact form prepares an inquiry. The form downloads a UTF-8 text request locally and does not send user information. Set `config.contactUrl` in `app.js` to your real contact page to redirect contact and subscription calls to action. Replace the inquiry handler with a real backend when available.

The footer's 2024 copyright is kept from the supplied design. Update it after confirming ownership and the intended launch year.

## GitHub

Create an empty repository, then run from this directory:

```bash
git init
git add .
git commit -m "Implement Sanaa landing page from Figma"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
git push -u origin main
```

Replace the remote with your real repository URL. No account tokens or credentials belong in this project.
