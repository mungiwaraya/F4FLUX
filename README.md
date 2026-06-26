# F4FLUX — Premium Streetwear Landing Website

> **More Than Clothing. It's an Identity.**

A fully responsive, premium, futuristic landing page built for **F4FLUX** clothing brand — designed for GitHub Pages hosting using only **HTML5, CSS3, and Vanilla JavaScript**.

---

## 🚀 Live Demo

Deploy to GitHub Pages and your site goes live instantly — no server, no backend, no build step.

---

## ✨ Features

| Feature | Status |
|---|---|
| Dark Mode (default) | ✅ |
| Custom cursor + ring | ✅ |
| Mouse glow effect | ✅ |
| Loading screen animation | ✅ |
| Page transition overlay | ✅ |
| Floating particles (Canvas) | ✅ |
| Scroll reveal animations | ✅ |
| Ripple button effects | ✅ |
| Glass-style navbar (sticky) | ✅ |
| Hamburger mobile menu | ✅ |
| Animated marquee strip | ✅ |
| Scroll indicator arrow | ✅ |
| Back-to-top button | ✅ |
| JSON-driven social cards | ✅ |
| Live search on social pages | ✅ |
| Fully responsive | ✅ |
| SEO meta tags | ✅ |
| No backend / No build tool | ✅ |
| GitHub Pages compatible | ✅ |

---

## 📁 Folder Structure

```
f4flux/
├── index.html           ← Main landing page
├── instagram.html       ← Instagram accounts page
├── youtube.html         ← YouTube channels page
├── facebook.html        ← Facebook pages page
├── x.html               ← X (Twitter) profiles page
├── website.html         ← Official websites page
│
├── css/
│   └── style.css        ← All styles (single file, organised)
│
├── js/
│   ├── main.js          ← Global JS (cursor, particles, navbar, etc.)
│   └── loadSocial.js    ← Reusable card loader (reads JSON → renders cards)
│
├── data/
│   ├── instagram.json   ← Instagram account data
│   ├── youtube.json     ← YouTube channel data
│   ├── facebook.json    ← Facebook page data
│   ├── x.json           ← X profile data
│   └── website.json     ← Official website data
│
├── images/              ← Profile pictures & brand assets
├── assets/              ← Extra assets (icons, etc.)
├── fonts/               ← Local fonts (optional)
└── README.md
```

---

## 📦 Deploying to GitHub Pages

1. **Create a new GitHub repo** (e.g. `f4flux-site`)
2. **Upload all files** (drag and drop in GitHub UI, or use `git push`)
3. Go to **Settings → Pages → Source → main branch / root**
4. GitHub will give you a URL like `https://yourusername.github.io/f4flux-site/`
5. Done! 🎉

> ⚠️ The JSON files are loaded via `fetch()`. GitHub Pages serves files over HTTPS, so `fetch()` works perfectly. Local file:// won't work — use VS Code Live Server for local development.

---

## ✏️ Adding New Social Accounts

Open any JSON file in `data/` and add a new entry:

```json
{
  "name": "F4FLUX Studio",
  "username": "@f4flux.studio",
  "profile": "images/profile-studio.jpg",
  "description": "Behind the scenes at F4FLUX HQ.",
  "verified": false,
  "url": "https://instagram.com/f4flux.studio"
}
```

**That's it.** The page will automatically render the new card — no HTML changes needed.

---

## 🎨 Customisation

### Change Accent Colour
Edit `css/style.css`, line 14:
```css
--accent: #7B2FFF;  /* Change to any colour */
```

### Add a New Social Platform
1. Create `yourplatform.html` (copy any existing social page)
2. Create `data/yourplatform.json`
3. Add a card in `index.html` Social Hub section
4. Add nav links

### Replace Profile Images
Drop real `.jpg` / `.png` files into `images/` and update the JSON `"profile"` field.

---

## 🛠 Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Variables, Grid, Flexbox, animations, glassmorphism
- **Vanilla JavaScript** — No frameworks, no dependencies
- **Google Fonts** — Bebas Neue + Poppins
- **JSON** — Data layer for dynamic card generation

---

## 🏷 Brand Info

| Property | Value |
|---|---|
| Brand | F4FLUX |
| Category | Premium Streetwear |
| Theme | Dark luxury / futuristic |
| Accent | Electric Purple `#7B2FFF` |
| Fonts | Bebas Neue, Poppins |

---

© 2024 F4FLUX. All rights reserved. More Than Clothing — It's an Identity.
