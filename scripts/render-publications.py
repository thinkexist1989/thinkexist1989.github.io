#!/usr/bin/env python3
"""Render the curated bibliography into HTML; the browser needs no data fetch."""
import argparse
import json
import re
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
data = json.loads((ROOT / 'assets/data/publications.json').read_text())
records = data['records']
labels = {'journal': 'Journal article', 'conference': 'Conference paper', 'patent': 'Patent'}
years = sorted({r['year'] for r in records}, reverse=True)
rows = []
for r in records:
    lang = ' lang="zh-CN"' if r['type'] == 'patent' else ''
    link = (f'<a href="{escape(r["url"], quote=True)}">{escape(r["link_label"])} <span aria-hidden="true">↗</span></a>'
            if r['url'] else '<span class="publication-note">Original record link not yet verified.</span>')
    bib = ''
    if r['bibtex']:
        bib = f'''<details class="citation-disclosure"><summary>BibTeX citation</summary>
                        <pre><code id="cite-{r['id']}">{escape(r['bibtex'])}</code></pre>
                        <button type="button" data-copy="cite-{r['id']}" hidden>Copy BibTeX</button>
                        <span class="copy-status" role="status"></span></details>'''
    rows.append(f'''                <li id="{r['id']}" class="publication-entry" data-year="{r['year']}" data-type="{r['type']}">
                    <p class="publication-meta">{r['year']} · {labels[r['type']]}</p>
                    <div><h3{lang}>{escape(r['title'])}</h3><p class="publication-citation"{lang}>{r['citation_html']}</p>
                    <div class="publication-actions">{link}</div>{bib}</div>
                </li>''')
options = ''.join(f'<option value="{year}">{year}</option>' for year in years)
section = f'''        <!-- PUBLICATIONS:START -->
        <section id="publication" class="publication-section site-container" aria-labelledby="publication-title">
            <div class="section-heading"><h2 id="publication-title">Publications &amp; patents</h2><p>Methods, experiments, and results. <br>Explore the research behind the robots.</p></div>
            <form id="publication-filters" class="publication-filters" role="search" aria-label="Search publications" hidden>
                <label>Search works<input type="search" id="publication-query" placeholder="Title, author, or keyword"></label>
                <label>Year<select id="publication-year"><option value="all">All years</option>{options}</select></label>
                <label>Type<select id="publication-type"><option value="all">All types</option><option value="journal">Journal articles</option><option value="conference">Conference papers</option><option value="patent">Patents</option></select></label>
                <button type="reset" class="button">Reset filters</button>
            </form>
            <p id="publication-count" class="publication-count" role="status" aria-live="polite">{len(records)} works</p>
            <p class="publication-date-note">Newest first. Paper years follow the published volume; patent years follow the dates in the listed records.</p>
            <ol class="publication-results">
{chr(10).join(rows)}
            </ol>
            <div id="publication-empty" class="publication-empty" hidden><h3>No matching works</h3><p>Try another keyword, year, or type.</p><button type="button" class="button" id="publication-reset">Show all works</button></div>
        </section>
        <!-- PUBLICATIONS:END -->'''
path = ROOT / 'index.html'
original = path.read_text()
rendered, count = re.subn(r'        <!-- PUBLICATIONS:START -->.*?        <!-- PUBLICATIONS:END -->', lambda _: section, original, flags=re.S)
assert count == 1, 'Expected one publications region'
parser = argparse.ArgumentParser()
parser.add_argument('--check', action='store_true')
args = parser.parse_args()
if args.check:
    if original != rendered:
        raise SystemExit('Publication HTML is stale. Run python3 scripts/render-publications.py')
    print(f'{len(records)} publication records match the static HTML.')
else:
    path.write_text(rendered)
    print(f'Rendered {len(records)} publication records.')
