# Vaibhav Govilkar — Personal Portfolio (2026 Refresh)

Live: [https://www.vaibhavgovilkar.com](https://www.vaibhavgovilkar.com) | [https://vgovilkar.github.io](https://vgovilkar.github.io)

Staff Software Engineer & Tech Lead @ Meta AI Inference — 12+ years building AI deployment platforms, developer tooling, and VR systems. Portfolio showcases Experience, Skills, and archived projects.

## What's New (July 2026 Modernization)

- **Repo hygiene**: Removed committed `node_modules` (4.6MB) and `.DS_Store`, added proper `.gitignore`, deleted dead files `custom.css`, `bootstrap-social.css`, `scrollto.js`
- **SEO & Perf**: Added OG tags, Twitter cards, canonical, JSON-LD Person schema, `robots.txt`, `sitemap.xml`, favicon, Inter font, GLightbox CSS fix, Bootstrap 5.3.2 → 5.3.8
- **Bug fixes**: Dynamic footer year, Formspree fallback to `mailto:`, system `prefers-color-scheme` detection, safer dropdown JS, native lazy loading + width/height
- **Content rewrite**: 
  - Hero now leads with Staff @ Meta AI + metrics (37%→66% unassisted, 10%→33% approval, 48%→57% CSAT)
  - New **About** with TL;DR from resume
  - New **Experience** timeline: AI Inference (2024-Pres), Reality Labs (2022-2024), Horizon Founding (2017-2021), Orbitz/Expedia, Nokia, UIC EVL
  - New **Skills**: Languages, Frameworks, Domains (AI/ML Infra, Agentic Systems, MCP, Platform tooling)
  - **Projects** restructured as archive with notice — 2008-2015 hackathon/game dev work de-emphasized
- **Resume**: Replaced PDF with 2026 version

## Features

- Modern Design - Clean minimalist with gradient accents, timeline, skill pills
- Responsive Layout - Mobile-first, no `background-attachment: fixed` jank on iOS
- Dark/Light Theme with system preference and localStorage persistence
- Interactive Elements - AOS scroll, GLightbox, smooth scroll, back-to-top
- Optimized Performance - Preconnect, lazy images, 5.3.8 Bootstrap CDN, minimal JS
- Accessibility - WCAG contrast fixes, aria labels, keyboard nav, reduced-motion support

## Tech Stack

- Vanilla HTML5 + modern CSS custom properties for theming
- JavaScript ES6+ (no jQuery)
- Bootstrap 5.3.8, Font Awesome 6.5.1, AOS 2.3.1, GLightbox
- GitHub Pages with custom domain `www.vaibhavgovilkar.com`

## Local Dev

```bash
git clone https://github.com/vgovilkar/vgovilkar.github.io.git
cd vgovilkar.github.io
python3 -m http.server 8000
# open http://localhost:8000
```

No build step needed.

## Structure

```
index.html          # Main page with SEO, hero, about, experience, skills, projects, contact
css/modern.css      # Dark/light themes + timeline + skill pills + 2026 additions
js/modern.js        # Theme toggle, scroll, form mailto fallback, year update
images/             # Profile + project screenshots (lazy loaded)
files/              # Resume PDF
CNAME               # www.vaibhavgovilkar.com
robots.txt / sitemap.xml
```

## Contact Form

Old Formspree email endpoint (`formspree.io/you@email`) is deprecated. Now:
- If you set `action="https://formspree.io/f/YOUR_FORM_ID"` it POSTs via fetch
- Otherwise falls back to `mailto:vaibhavgovilkar88@gmail.com` with subject/body prefill

## License

Copyright © 2026 Vaibhav Govilkar. All rights reserved.
