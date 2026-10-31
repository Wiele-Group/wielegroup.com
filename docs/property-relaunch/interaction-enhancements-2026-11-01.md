# Wiele interaction enhancements — 1 November 2026

Status: verified locally; production release in progress.

Direction: an architectural editorial stage. Retain approved identity, factual copy, contact routing and imagery disclosures. Use CSS and native HTML; no new animation dependencies or WebGL payload.

## Interaction contract

| Element | Purpose / input | States / motion | Interruption | Keyboard, touch and reduced motion |
| --- | --- | --- | --- | --- |
| Report cover | Make the report tangible; hover/focus, activate link | Resting printed layers, active cover straightens and rises 5px; native navigation on activation | CSS retargets immediately when focus/hover leaves | Link remains stable; phone cover rests flat; pause/reduce removes transforms; image dimensions reserve layout, link caption remains if image fails |
| Investment cards | Clarify the whole card is actionable | Rest, active underline and arrow contrast; existing modest image enlargement | CSS reverses on leave, no queued timelines | Focus receives matching emphasis; touch uses normal link; reduce/pause removes image/arrow transforms |
| Compact menu | Make every section accessible | Native closed/open details; 260ms entrance, current-page highlight | Toggle, Escape, outside pointer, focus leaving, route change, desktop resize close it | Native summary keyboard activation; Escape restores summary focus; links tab normally; native disclosure works without JS; reduced motion/pause removes entrance |
| Scroll reveals | Introduce report feature consistently | Existing one-shot observer adds report columns; content visible without enhancement | Observer cleanup on navigation and motion change | Focus-within exposes content; reduced motion/pause exposes all; media-query changes now update scroll state too |

No loading or submission state is introduced; functional link and menu state does not depend on animation completion. No live enquiry is submitted.
