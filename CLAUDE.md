# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static personal portfolio website for Yang Luo (罗阳), a robotics researcher at Shenyang Institute of Automation, CAS. Built on BootstrapMade's "Personal" template and deployed via GitHub Pages at `yluo.name`.

## Local development

```bash
# Start a local server (Python 3)
python -m http.server 8000
# Or with Node
npx http-server
```

Open `http://localhost:8000`. No build step — edit HTML/CSS/JS directly.

## Architecture

**Single-page app with section switching.** `index.html` contains all sections (About, Projects, Publications, Contact) as `<section>` elements. Navigation is handled by [assets/js/main.js](assets/js/main.js): clicking a nav link adds `.header-top` to the header (collapsing it) and `.section-show` to the target section, hiding all others. Hash-based deep-linking is supported on page load.

**Project detail pages are standalone HTML files** under `projects/<name>/index.html`, loaded inside Venobox iframes from the main page. Each references shared CSS/JS via relative paths (`../../assets/...`). Project media (images, GIFs, videos) lives alongside the detail page in the same directory.

## Key files

| File | Role |
|------|------|
| [index.html](index.html) | Main page — all sections, personal info, publications, project grid, Typed.js init, Leaflet map |
| [assets/css/style.css](assets/css/style.css) | All custom styles (Bootstrap overrides, section animations, portfolio hover effects) |
| [assets/js/main.js](assets/js/main.js) | Navigation (desktop + mobile), Isotope project filtering, Venobox lightbox, Owl Carousel, Waypoints |
| [projects/resume.html](projects/resume.html) | Standalone resume page |

## Adding a project

1. Create `projects/<name>/index.html` — copy an existing one (e.g., [projects/cobot/index.html](projects/cobot/index.html)) as a template, keeping the same `<head>` vendor includes and relative paths
2. Add an intro image at `projects/<name>/intro.png` (or `.jpg`)
3. Add a `.project-item` card in the portfolio grid in [index.html](index.html) with the appropriate filter classes (`filter-system`, `filter-control`, `filter-hmi`)
4. Project images/GIFs/videos referenced in the detail page live in the same `projects/<name>/` directory

## Style conventions

- Primary brand color: `#1239d6` (used for links, highlights, header backgrounds on scroll)
- Accent green: `#1c7d32` (hover states, social link backgrounds)
- Font stack: `"Lato", "LXGW WenKai Mono TC", sans-serif` for body; `"Poppins", "Raleway"` for headings; `"Birthstone"` for the name in the hero
- The page background uses a `linear-gradient(160deg, #1239d6 0%, #ffffff 35%)` fixed pseudo-element on `body::before`
- All third-party libraries are vendored locally in `assets/vendor/` — no CDN dependencies except Google Fonts, Google Analytics/Tag Manager, and Leaflet (loaded from cdnjs)

## Template origin

Based on [Personal v2.1.0](https://bootstrapmade.com/personal-free-resume-bootstrap-template/) by BootstrapMade. The original template credits are preserved in comments in index.html, style.css, and main.js.
