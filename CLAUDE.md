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

**Continuous-scroll homepage.** `index.html` exposes all sections through native anchors. `assets/js/main.js` adds mobile navigation, active-section tracking, accessible Isotope filtering, and an optional lazy map. `assets/js/motion.js` adds local Anime.js effects; content remains available with JavaScript disabled or reduced motion enabled.

**Standalone project pages.** `projects/<name>/index.html` uses `assets/css/legacy.css` and `assets/js/legacy.js` to retain its existing design until phase two. Homepage project links navigate directly to these pages. Project media stays beside each detail page.

## Key files

| File | Role |
|------|------|
| `index.html` | Homepage content, projects, publications and contacts |
| `assets/css/style.css` | Homepage design tokens and responsive layout |
| `assets/js/main.js` | Navigation, project filtering and lazy map |
| `assets/js/motion.js` | Optional Anime.js enhancement and video behavior |
| `assets/media/` | Optimized media; README records original sources |
| `DESIGN.md` | Visual and interaction specification |
| `docs/phase-one-review.md` | Review screenshots and validation results |

## Adding a project

1. Create `projects/<name>/index.html` — copy an existing one (e.g., [projects/cobot/index.html](projects/cobot/index.html)) as a template, keeping the same `<head>` vendor includes and relative paths
2. Add an intro image at `projects/<name>/intro.png` (or `.jpg`)
3. Add a `.project-item` card in the portfolio grid in [index.html](index.html) with the appropriate filter classes (`filter-system`, `filter-control`, `filter-hmi`)
4. Project images/GIFs/videos referenced in the detail page live in the same `projects/<name>/` directory

## Style conventions

- Follow `DESIGN.md`: cool white `#F5F7FA`, graphite `#111820`, engineering blue `#1239D6`.
- Homepage font: locally bundled IBM Plex Sans with system Chinese fallbacks.
- Use native controls and visible initial HTML; animation must not gate navigation or reading.
- Fonts and Anime.js are local; existing analytics and the opt-in Leaflet map use external services.
- Keep the original style of detail pages in the legacy files until their planned redesign.

## Template origin

Based on [Personal v2.1.0](https://bootstrapmade.com/personal-free-resume-bootstrap-template/) by BootstrapMade. The original template credits are preserved in comments in index.html, style.css, and main.js.
