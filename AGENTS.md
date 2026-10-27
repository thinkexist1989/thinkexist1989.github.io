# Repository Guidelines

## Project Structure & Module Organization

This is Yang Luo’s static robotics portfolio, hosted on GitHub Pages with the custom domain `yluo.name`.

- `index.html` contains the homepage sections, project cards, publications, and contact information.
- `assets/css/style.css` holds shared design tokens and homepage styles; `projects.css` styles detail pages. `main.js` handles homepage navigation, project filtering, and lazy maps; `research.js` adds the ROCOS explorer and publication filters; `motion.js` adds optional Anime.js effects; `projects.js` handles detail-page media. Only the archived `projects/resume.html` retains `legacy.css` and `legacy.js`.
- `assets/img/` stores shared images; `assets/vendor/` contains bundled third-party libraries.
- `projects/<project_name>/index.html` contains each project’s detail page, with images, GIFs, and videos alongside it. `projects/resume.html` is the standalone resume.
- `CNAME` configures the custom domain. There is no application backend or dedicated test directory.

## Build, Test, and Development Commands

Run commands from the repository root:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
node --check assets/js/main.js
node --check assets/js/motion.js
node --check assets/js/research.js
node --check assets/js/projects.js
python3 scripts/render-publications.py --check
git diff --check
```

Open `http://localhost:8000` to preview edits. The Node commands check JavaScript syntax; the Python check verifies the generated bibliography; `git diff --check` detects whitespace errors. There is no build step, package installation requirement, or configured test runner. Edit HTML, CSS, and JavaScript directly.

## Coding Style & Naming Conventions

Match surrounding formatting: generally four spaces in HTML and two in CSS/JavaScript. Keep homepage enhancements independent of animation and preserve script loading order. Use lowercase project directories with underscores, such as `servo_driver`, and descriptive hyphenated CSS classes. No formatter or linter is configured.

For new projects, adapt an existing detail page, verify shared asset paths use `../../assets/`, and add a homepage `.project-item` card with suitable `filter-system`, `filter-control`, or `filter-hmi` classes. Store the thumbnail as `intro.jpg` or `intro.png` beside the page. Prefer shared styles over repeated inline declarations; preserve template credits and vendor licenses.

## Testing Guidelines

No automated framework or coverage threshold exists. Preview changes at desktop and mobile widths. Check anchors/history, mobile menus, filters, images, and video playback, including disabled JavaScript and reduced motion. Open modified detail pages directly as well. Inspect browser console and network errors for broken relative paths. For contact changes, verify the lazily loaded map. Record checks and any limitations in the pull request.

## Commit & Pull Request Guidelines

History uses short subjects such as `Add MSMRS` and `Update index.html`; no Conventional Commits scheme is established. Prefer specific imperative subjects, for example `Fix ROCOS project image paths`. Keep commits focused.

Pull requests should describe the change, list affected pages and verification steps, link related issues when applicable, and include desktop/mobile screenshots for visual changes.

## Publications and Media

Edit curated records in `assets/data/publications.json`, then run `python3 scripts/render-publications.py` to refresh the marked region in `index.html`. The generated HTML is committed; visitors do not need JavaScript or a data fetch to read it. Verify source metadata before adding DOI links or BibTeX. Preserve author-role annotations; record corrections in `docs/publication-sources.md`.

Keep original project media. Place derived MP4s and posters in `assets/media/details/`, record their origins, and use native controls with `preload="none"`. External videos must load only after an explicit action and retain a normal source link.
