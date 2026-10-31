# Wiele interaction enhancements — 1 November 2026

Status: published and verified at https://wielegroup.com/. Source ac6b67e; Worker f87179cf-acc2-443f-bdb0-c3a677d2e449, 100% traffic.

Direction: an architectural editorial stage. Retain approved identity, factual copy, contact routing and imagery disclosures. Use CSS and native HTML; no new animation dependencies or WebGL payload.

## Interaction contract

| Element | Purpose / input | States / motion | Interruption | Keyboard, touch and reduced motion |
| --- | --- | --- | --- | --- |
| Report cover | Make the report tangible; hover/focus, activate link | Resting printed layers, active cover straightens and rises 5px; native navigation on activation | CSS retargets immediately when focus/hover leaves | Link remains stable; phone cover rests flat; pause/reduce removes transforms; image dimensions reserve layout, link caption remains if image fails |
| Investment cards | Clarify the whole card is actionable | Rest, active underline and arrow contrast; existing modest image enlargement | CSS reverses on leave, no queued timelines | Focus receives matching emphasis; touch uses normal link; reduce/pause removes image/arrow transforms |
| Compact menu | Make every section accessible | Native closed/open details; 260ms entrance, current-page highlight | Toggle, Escape, outside pointer, focus leaving, route change, desktop resize close it | Native summary keyboard activation; Escape restores summary focus; links tab normally; native disclosure works without JS; reduced motion/pause removes entrance |
| Scroll reveals | Introduce report feature consistently | Existing one-shot observer adds report columns; content visible without enhancement | Observer cleanup on navigation and motion change | Focus-within exposes content; reduced motion/pause exposes all; media-query changes now update scroll state too |

No loading or submission state is introduced; functional link and menu state does not depend on animation completion. No live enquiry is submitted.

Verification: changed-file lint, TypeScript and Cloudflare build passed. All fourteen local and live pages, assets, links, metadata/schema and crawl checks passed. Browser reviewed at 320/390/768/1440px; keyboard/menu, focus/card/report, pause and buyer enquiry routing tested. OS reduced-motion changes, disabled-JS browsing and physical phones not exercised; fallbacks reviewed in source. No production performance measurement or live form submission. Evidence: /Users/jonathanlandman/Documents/Wiele Properties/Website/2026-11-01-interaction-enhancements.
