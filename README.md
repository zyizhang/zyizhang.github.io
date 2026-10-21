zyizhang.github.io
========

Personal academic website of Zhenyi Zhang, hosted at https://zyizhang.github.io/ with GitHub Pages.

The homepage is a static HTML/CSS site. See [MAINTENANCE.md](MAINTENANCE.md) for editing and local preview instructions. Update publications, news and awards with `python scripts/update_publications.py`.

Source data for public website content is maintained in `othermaterials/publications.json`, `othermaterials/news.json` and `othermaterials/awards.json`. Working notes, original CV text and temporary tools are kept local and excluded from Git.

Legacy template content retains its original [Creative Commons Attribution 3.0 Unported License](http://creativecommons.org/licenses/by/3.0/deed.en_US). Publication figures and third-party brand icons retain their respective licenses; figure sources are linked on the page and icon attribution is in `assets/icons/`.

**NOTE:** If you fork or re-use this project, please be sure you:

* Edit `_includes/analytics.html` and either
  * Replace the Google Analytics tracking code with your own, or
  * If you don't use Google Analytics, comment the block of code out entirely.
* Edit `_includes/disqus.html` and either
  * Replace the `disqus_shortname` with your own DISQUS username, or
  * If you don't want commenting, remove or comment out the block of code entirely.

Otherwise I will receive GA data and DISQUS comments from your website.
