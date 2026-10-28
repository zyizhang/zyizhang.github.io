"""Notify IndexNow participants of a published homepage update."""

import json
from pathlib import Path
import re
import sys
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


def main():
    root = Path(__file__).resolve().parent.parent
    key_files = [
        path for path in root.glob("*.txt")
        if re.fullmatch(r"[0-9a-f]{32}", path.stem)
        and path.read_text(encoding="utf-8").strip() == path.stem
    ]
    if len(key_files) != 1:
        raise SystemExit("Expected one valid IndexNow verification file in the site root.")

    key_file = key_files[0]
    homepage = "https://zyizhang.github.io/"
    # Ownership proof must already be available on the deployed site.
    try:
        with urlopen(homepage + key_file.name, timeout=25) as response:
            published_key = response.read().decode("utf-8").strip()
        if published_key != key_file.stem:
            raise SystemExit("Published verification file does not match. Deploy it first.")

        data = {
            "host": "zyizhang.github.io",
            "key": key_file.stem,
            "keyLocation": homepage + key_file.name,
            "urlList": [homepage],
        }
        request = Request(
            "https://www.bing.com/indexnow",
            data=json.dumps(data).encode("utf-8"),
            headers={"Content-Type": "application/json; charset=utf-8"},
            method="POST",
        )
        with urlopen(request, timeout=25) as response:
            status = response.status
    except (HTTPError, URLError, TimeoutError) as error:
        print(f"IndexNow notification failed: {error}", file=sys.stderr)
        return 1

    if status not in (200, 202):
        print(f"Unexpected IndexNow response: HTTP {status}", file=sys.stderr)
        return 1
    message = "received" if status == 200 else "received; ownership validation pending"
    print(f"HTTP {status}: homepage update {message}.")
    print("This confirms receipt only; indexing and search ranking are not guaranteed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
