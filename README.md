# Zhenyi Zhang - Personal Academic Website

Live site: https://zyizhang.github.io/

Personal academic homepage of **Zhenyi Zhang**, PhD candidate in the Space Geodesy Group at **ETH Zurich**. Research focuses on GNSS meteorology, tropospheric modeling, physics-informed machine learning, and AI for Earth science. [Visit the homepage](https://zyizhang.github.io/).

A static academic homepage, published with GitHub Pages from the `master` branch. The active site has no Bootstrap, front-end package manager, or local Ruby dependency.

## Repository layout

- `index.html`: homepage, biography and research interests.
- `assets/`: current CSS, theme and pagination JavaScript, publication thumbnails and link icons with attribution.
- `cv/`: a contact page for CV requests. PDF CVs are not published.
- `img/snowboarding.jpg`: current profile photo.
- `robots.txt`, `sitemap.xml`, `CNAME`: search and hosting configuration.
- `google1ce0c4b82039fdff.html`: Google Search Console verification; keep this file and the homepage verification meta tag.
- The root 32-character hexadecimal `.txt` file verifies IndexNow ownership.

Only files required by the public website and their attribution are tracked. Private documents, source materials, editing tools and archives are maintained locally. The `.gitignore` allowlist prevents new materials from being uploaded by default.

## Update and preview

Preview locally:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Visit http://127.0.0.1:8000/ . Push reviewed changes to `master` to publish; check the repository's Pages build and deployment in GitHub Actions.

Common former URLs redirect to the current homepage sections. Old CV entry pages provide contact information instead of a PDF download. The Google verification file remains available at its original root URL.

## Attribution

Publication figures and brand icons retain their respective licenses; figure sources are linked on the homepage and icon attribution is in `assets/icons/`.
