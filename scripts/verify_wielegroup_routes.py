#!/usr/bin/env python3
"""Verify Wiele's HTTP redirects, canonical pages and FX response contract."""

import argparse
from datetime import date
import json
import math
import urllib.error
import urllib.request
from urllib.parse import urlsplit


CURRENCIES = {"EUR", "GBP", "ZAR", "USD", "CHF", "SEK", "NOK", "DKK", "PLN", "CZK"}
REDIRECTS = {
    "/enquire": "/contact",
    "/property": "/private-mandates",
    "/properties": "/private-mandates",
    **{f"/{locale}/properties": f"/{locale}/private-mandates" for locale in ("de", "fr", "it", "es")},
    "/valuations-currency": "/valuations",
    "/seller-onboarding": "/list-asset",
    "/for-sellers": "/list-asset",
    "/for-buyers": "/investor-onboarding",
    "/legal-guide": "/legal-compliance/cross-border",
    "/malta-maintenance": "/property-maintenance",
    "/imagery-credits": "/credits",
    "/imprint": "/terms",
}
ORIGINATION_REDIRECTS = {
    "/algorithm": "/origination-protocol",
    "/the-algorithm": "/origination-protocol",
    "/wiele-algorithm": "/origination-protocol",
    **{f"/{locale}/wiele-algorithm": f"/{locale}/origination-protocol" for locale in ("de", "fr", "it", "es")},
}
PAGES = (
    "/", "/about", "/private-mandates", "/de/private-mandates", "/fr/private-mandates", "/it/private-mandates", "/es/private-mandates", "/origination-protocol", "/luxury-assets",
    "/luxury-assets/classic-cars", "/valuations", "/research", "/malta-investment-report",
    "/contact", *(f"/{locale}/{route}" for locale in ("de","fr","it","es") for route in ("origination-protocol","contact")), "/list-asset", "/seller-enquiry", "/terms/seller-retainer", "/privacy",
)


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def request(opener, url):
    try:
        response = opener.open(url, timeout=12)
    except urllib.error.HTTPError as error:
        response = error
    with response:
        return response.status, response.headers, response.read()


def check(opener, url, expected_status, destination=None):
    status, headers, body = request(opener, url)
    if status != expected_status:
        raise ValueError(f"HTTP {status}, expected {expected_status}")
    if destination is not None and headers.get("Location") != destination:
        raise ValueError(f"Location {headers.get('Location')!r}, expected {destination!r}")
    if urlsplit(url).path == "/api/fx-rates":
        payload = json.loads(body)
        rates = payload["rates"]
        degraded = payload["degraded"]
        if payload["base"] != "EUR" or type(degraded) is not bool or rates.get("EUR") != 1:
            raise ValueError("Invalid FX base or fallback marker")
        if set(rates) != CURRENCIES or any(
            type(rate) not in (float, int) or not math.isfinite(rate) or rate <= 0
            for rate in rates.values()
        ):
            raise ValueError("Incomplete or invalid FX rates")
        if date.fromisoformat(payload["date"]) > date.today() or not payload["source"]:
            raise ValueError("Invalid FX date or source")
        expected_ttl = "s-maxage=300" if degraded else "s-maxage=3600"
        if expected_ttl not in headers.get("Cache-Control", "") or headers.get("X-Robots-Tag") != "noindex":
            raise ValueError("Invalid cache or indexing headers")
        return f"{status}, rate date {payload['date']}, fallback={degraded}"
    if destination:
        return f"{status} → {destination}"
    if "text/html" not in headers.get("Content-Type", ""):
        raise ValueError("Expected an HTML page")
    return str(status)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("base", nargs="?", default="https://wielegroup.com")
    args = parser.parse_args()
    base = args.base.rstrip("/")
    query = "?utm_source=route-smoke&check=1"
    checks = [
        (base + alias + suffix + query, 308, base + target + query)
        for alias, target in REDIRECTS.items()
        for suffix in ("", "/")
    ] + [
        (base + alias + suffix + query, 301, base + target + query)
        for alias, target in ORIGINATION_REDIRECTS.items()
        for suffix in ("", "/")
    ] + [(base + path, 200, None) for path in (*PAGES, "/api/fx-rates")]
    if base == "https://wielegroup.com":
        checks += [
            (f"{scheme}://www.wielegroup.com{path}{query}", 308, base + (path if scheme == "http" else target) + query)
            for scheme in ("http", "https")
            for path, target in (("/", "/"), ("/valuations", "/valuations"), ("/enquire/", "/contact"))
        ]
    opener = urllib.request.build_opener(NoRedirect)
    opener.addheaders = [("User-Agent", "WieleRouteSmoke/1.0")]
    failures = 0
    for url, status, target in checks:
        try:
            result = check(opener, url, status, target)
            print(f"PASS {url} → {result}")
        except (OSError, ValueError, KeyError, TypeError) as error:
            failures += 1
            print(f"FAIL {url} → {error}")
    return int(bool(failures))


if __name__ == "__main__":
    raise SystemExit(main())
