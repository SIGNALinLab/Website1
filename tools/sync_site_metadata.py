#!/usr/bin/env python3
"""Regenerate domain-dependent robots.txt and sitemap.xml from assets/data/config.json."""
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
cfg=json.loads((root/'assets/data/config.json').read_text(encoding='utf-8'))
base=cfg.get('canonicalBaseUrl','').strip()
if not base.startswith(('http://','https://')):
    raise SystemExit('canonicalBaseUrl must be an absolute http(s) URL')
base=base.rstrip('/')+'/'
pages=['','publications.html','projects.html','people.html','admissions.html','apply.html','equipment.html','contact.html','verify.html']
(root/'robots.txt').write_text(f'User-agent: *\nAllow: /\nSitemap: {base}sitemap.xml\n',encoding='utf-8')
urls='\n'.join(f'<url><loc>{base}{p}</loc></url>' for p in pages)
(root/'sitemap.xml').write_text(f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}\n</urlset>\n',encoding='utf-8')
print('Synchronized robots.txt and sitemap.xml from canonicalBaseUrl:',base)
