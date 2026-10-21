"""Render publications, news and awards from content/ into the static homepage."""
import json
import re
from html import escape
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]

def safe_url(value):
    if urlsplit(value).scheme not in {"https", "http"}:
        raise ValueError(f"Expected an HTTP(S) link: {value!r}")
    return escape(value, quote=True)

def main():
    papers = json.loads((ROOT / "content/publications.json").read_text(encoding="utf-8-sig"))
    papers = [p for p in papers if p.get("visible", True)]
    parts = []
    # Issue year takes precedence over online publication year (e.g. GPS Solutions).
    papers = sorted(papers, key=lambda p: (int(p["year"]), p.get("date", str(p["year"]))), reverse=True)
    for p in papers:
        author_names = re.split(r", | and ", p["authors"])
        marked = []
        owner_marked = False
        for index, name in enumerate(author_names):
            author = escape(name)
            if name == "Z. Zhang" and not owner_marked:
                author = f"<strong>{author}</strong>"
                owner_marked = True
            if index in p.get("corresponding_indices", []):
                author += '<sup title="Corresponding author">†</sup>'
            marked.append(author)
        authors = ", ".join(marked)
        url = safe_url(p["url"])
        image = ""
        if p.get("image"):
            image_path = Path(p["image"])
            resolved = (ROOT / image_path).resolve()
            if not resolved.is_relative_to(ROOT) or not resolved.is_file():
                raise ValueError(f"Missing local publication image: {image_path}")
            source = safe_url(p.get("image_source", p["url"]))
            image = f'<figure class="paper-figure"><a href="{source}"><img class="paper-image" src="{escape(image_path.as_posix(), quote=True)}" alt="Figure for {escape(p["title"], quote=True)}" loading="lazy"></a><figcaption><a href="{source}">Figure source</a></figcaption></figure>'
        label = {"journal": "Paper", "preprint": "arXiv", "talk": "Workshop"}[p["type"]]
        links = f'<a href="{url}">{label}</a>'
        if p.get("code"):
            links += f'<a href="{safe_url(p["code"])}">Code</a>'
        if p.get("project"):
            links += f'<a href="{safe_url(p["project"])}">Project</a>'
        if p.get("pdf"):
            links += f'<a href="{safe_url(p["pdf"])}">PDF</a>'
        if p.get("model"):
            links += f'<a href="{safe_url(p["model"])}">Model</a>'
        summary = f'<p class="paper-summary">{escape(p["summary"])}</p>' if p.get("summary") else ""
        tag = {"journal": p.get("status", "Journal article"), "preprint": "Preprint", "talk": "Workshop"}[p["type"]]
        parts.append(f'<article class="publication">{image}<div class="paper-body"><span class="paper-tag">{int(p["year"])} · {escape(tag)}</span><h3><a href="{url}">{escape(p["title"])}</a></h3><p class="authors">{authors}</p><p class="venue">{escape(p["venue"])}</p>{summary}<div class="paper-links">{links}</div></div></article>')
    page = ROOT / "index.html"
    html = page.read_text(encoding="utf-8-sig")
    start, end = "<!-- PUBLICATIONS:START -->", "<!-- PUBLICATIONS:END -->"
    before, remaining = html.split(start)
    _, after = remaining.split(end)
    html = before + start + "\n" + "\n".join(parts) + "\n" + end + after
    news_file = ROOT / "content/news.json"
    if news_file.exists():
        news = json.loads(news_file.read_text(encoding="utf-8-sig"))
        entries = []
        for item in sorted(news, key=lambda item: item["date"], reverse=True):
            if not re.fullmatch(r"\d{4}(?:-\d{2})?", item["date"]):
                raise ValueError("News dates must use YYYY or YYYY-MM")
            entries.append(f'<li><time datetime="{escape(item["date"])}">{escape(item["date"])}</time><span>{escape(item["text"])} <a href="{safe_url(item["url"])}">Read more →</a></span></li>')
        before, remaining = html.split("<!-- NEWS:START -->")
        _, after = remaining.split("<!-- NEWS:END -->")
        html = before + '<!-- NEWS:START -->\n<ul class="news-list">' + "\n".join(entries) + '</ul>\n<!-- NEWS:END -->' + after
    awards_file = ROOT / "content/awards.json"
    if awards_file.exists():
        awards = json.loads(awards_file.read_text(encoding="utf-8-sig"))
        entries = []
        for item in sorted(awards, key=lambda item: int(item["year"]), reverse=True):
            note = f'<small>{escape(item["note"])}</small>' if item.get("note") else ""
            entries.append(f'<li><time datetime="{int(item["year"])}">{int(item["year"])}</time><div>{escape(item["title"])}{note}</div></li>')
        before, remaining = html.split("<!-- AWARDS:START -->")
        _, after = remaining.split("<!-- AWARDS:END -->")
        html = before + '<!-- AWARDS:START -->\n<ul class="awards-list">' + "\n".join(entries) + '</ul>\n<!-- AWARDS:END -->' + after
    page.write_text(html, encoding="utf-8")
    print(f"Updated {len(papers)} publications in index.html")

if __name__ == "__main__":
    main()
