# Zhenyi Zhang - Personal Academic Website

Live site: https://zyizhang.github.io/

Personal academic homepage of **Zhenyi Zhang**, PhD candidate in the Space Geodesy Group at **ETH Zurich**. Research focuses on GNSS meteorology, tropospheric modeling, physics-informed machine learning, and AI for Earth science. [Visit the homepage](https://zyizhang.github.io/).

A static academic homepage, published with GitHub Pages from the `master` branch. The active site has no Bootstrap, front-end package manager, or local Ruby dependency.

## Repository layout

- `index.html`: homepage, biography and research interests.
- `assets/`: current CSS, pagination JavaScript, publication thumbnails and link icons.
- `content/`: editable public publication, news and award data; original publication figures are in `content/source-images/`.
- `cv/`: current public CV and its legacy URL redirect.
- `img/snowboarding.jpg`: current profile photo.
- `scripts/update_publications.py`: generate the data-driven homepage sections with Python's standard library.
- `robots.txt`, `sitemap.xml`, `CNAME`: search and hosting configuration.
- `google1ce0c4b82039fdff.html`: Google Search Console verification; keep this file and the homepage verification meta tag.
- The root 32-character hexadecimal `.txt` file verifies IndexNow ownership; `scripts/submit_indexnow.py` notifies Bing and other IndexNow participants after a homepage update is live.
- `legacy/`: recoverable archive of the previous template and unused resources; excluded from the published site.
- `othermaterials/`: local personal materials and working notes; ignored by Git and excluded from publication.

Read [MAINTENANCE.md](MAINTENANCE.md) for the Chinese maintenance guide.

## Update and preview

After editing the JSON files in `content/`, run:

```powershell
python scripts/update_publications.py
```

Preview locally:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Visit http://127.0.0.1:8000/ . Push reviewed changes to `master` to publish; check the repository's Pages build and deployment in GitHub Actions.

Common former URLs redirect to the current homepage sections or CV. The Google verification file remains available at its original root URL.

## Attribution

Archived template content retains its original Creative Commons Attribution 3.0 Unported license and existing third-party notices. See `legacy/README.md`. Publication figures and brand icons retain their respective licenses; figure sources are linked on the homepage and icon attribution is in `assets/icons/`.
