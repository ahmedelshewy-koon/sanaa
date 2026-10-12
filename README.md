# Sanaa Landing Page

Arabic, responsive landing page implemented from the supplied Figma design and updated `Desktop - 5.svg` export. Real HTML text, CSS layouts and JavaScript interactions; the page is not a flattened image.

The hero uses the supplied six-second `hero.mp4` video as a muted, looping background. `hero.png` remains visible while the video loads or if playback is unavailable. Visitors who prefer reduced motion see the still image.

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
- `public/assets/`: local original images and decorative SVG assets from the provided export.
- `scripts/`: dependency-free local server and static build.

## Design source

https://www.figma.com/design/weDhvLkw6rdYfR5vwjp54Z/?node-id=300-231

The uploaded export provides all original image fills. Decorative icons and laptop illustrations reuse the exported vectors without redrawing. Product dashboard previews use the same CRM dashboard image across four cards because that is what the supplied design contains. Original artwork spells the Latin logo `SANA`; the project name uses `Sanaa`. Artwork was preserved unchanged.

Alexandria is bundled locally under `public/fonts/`, including its SIL Open Font License. Images, icons and fonts work offline; there are no temporary Figma asset URLs or third-party runtime dependencies.

## Production integration

This is a front-end landing page. It does not implement authentication, a live dashboard, payment processing or a contact backend. The dashboard button opens the original design preview. The account icon opens system links.

The source design repeats the same complete-platform plan four times at **549 SAR/month**. These are preserved as visual instances, rather than inventing plan names or prices. The product tabs update the selected product and its icon. Selection is exclusive. Annual billing is a request preference; no annual price or discount is assumed.

The subscribe button prepares an inquiry. The form downloads a UTF-8 text request locally and does not send user information. Set `config.contactUrl` in `app.js` to your real contact page to redirect contact and subscription calls to action. Replace the inquiry handler with a real backend when available.

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
