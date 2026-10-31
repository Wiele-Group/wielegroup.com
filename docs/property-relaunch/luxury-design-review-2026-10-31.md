# Wiele Properties: microscope website review

31 October 2026 · Scope: typography, colour, layout and design philosophy across the ten public pages.

## Conclusion and direction

Discreet expertise. Wiele already has useful brand assets: the approved Option 1 emblem and signature, the exact tagline “Malta Property. Global Ambition.”, architectural imagery and a personal contact. The design should make those assets recognisable while giving property information room to be read. A speculative luxury visual alone cannot establish the quality of an investment or a service.

Evidence: live homepage visually inspected before editing, current production source and approved project memory examined. This is a direct study of Wiele, not a claim about another luxury house. Original design decisions below are recommendations applied to the site, not proven conversion results.

## Findings and applied response

| Observed in the existing implementation | Interpretation / commercial role | Applied change |
| --- | --- | --- |
| Desktop navigation dropped to 9px around 1150px; hero button to 9px; supporting copy generally 13–14px. | The intended restraint makes navigation and service information harder to read. | 12px navigation and buttons; primary reading copy 16px; mobile form text 16px. Navigation switches to the menu below 1180px. |
| Most headlines use the same 400-weight serif and many section titles compete at similar large sizes. | A beautiful face loses hierarchy when every section speaks with equal emphasis. | Retain Cormorant Garamond 400 for display; add 500 for card/process headings; retain Manrope 400/500/600 for reading and controls. Reduce secondary heading scale. |
| Palette relies on ivory, charcoal and several bronze/gold shades scattered across styles. | Similar shades without defined jobs make consistency harder to maintain. | Centralise colour roles; preserve approved charcoal/ivory/gold, define dark bronze specifically for text. |
| Hero has a 45/55 split, a 700–720px image minimum at common desktop sizes, and small copy. | The image dominates the proposition and next step. | 48/52 split; 660px desktop minimum; larger support text; concise stacked primary/secondary actions. Phone layout stacks copy then image. |
| Repeated oversized headings and variable image heights create an uneven rhythm. | Content sequence is less predictable; a reader must repeatedly reorient. | Shared responsive section spacing, aligned 4:5 image frames, smaller secondary headings, and consistent reading measures. |
| Footer links and secondary report/form details are very small. | Important service and enquiry details become peripheral. | Larger utility copy, wrapping footer groups, 44px link targets and a clearly readable motion preference control. |

## Implemented colour roles

| Role | HEX | Use | Measured contrast on ivory |
| --- | --- | --- | --- |
| Charcoal | #171A19 | Masthead, footer, primary buttons | Ivory on charcoal: 15.42:1 |
| Ink | #242823 | Main text | 13.17:1 |
| Ivory | #F4F0E8 | Primary surface | — |
| Muted | #555E56 | Supporting reading text | 5.92:1 |
| Bronze | #75603E | Eyebrows and editorial emphasis | 5.28:1 |
| Gold | #B99661 | Decorative accents and rules | 2.43:1; not used as small text on ivory |
| Pale gold | #DFC89E | Dark-surface accents and button fill | — |
| Limestone surface | #EBE5DA | Forms and principle section | — |

Ratios calculated from exact opaque sRGB pairs. They do not establish full WCAG compliance. Image overlays and other surfaces require their own contextual checks. The logo artwork was preserved, not recoloured or redrawn.

## Typography and layout rules

- Cormorant Garamond display 400 regular/italic; functional serif headings 500. Georgia/serif fallback. Manrope 400/500/600 with Arial/sans-serif fallback. Both families remain self-hosted through Next fonts. Official font licences identify SIL OFL 1.1: https://raw.githubusercontent.com/google/fonts/main/ofl/cormorantgaramond/OFL.txt and https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt.
- Hero 54–88px on desktop, 48–68px on typical phones, 46px on the narrowest breakpoint. Interior page titles 50px on phones. Main text 16px with 1.8 line height; reading widths controlled in the relevant columns.
- Main grid caps at 1280px. Responsive section spacing 64–112px. Image cards use aligned 4:5 frames. No additional decorative animation or generated imagery.
- Existing identity, approved wording, imagery disclosures, availability, contact routes and metadata remain intact. Sitemap date and edge-cache release key advance for this design release.

## Design philosophy and next evidence to build

The observable cues are editorial typography, controlled architectural crops, restrained bronze and a direct named contact. The intended audience response is confidence in a considered personal service; the commercial role is a clear property brief or owner enquiry. That response is a hypothesis, not an experimentally demonstrated effect.

Real instructed properties, documentary photography, useful particulars and verified transaction/service evidence will make a stronger long-term distinction than further ornament. The site currently states that no properties are advertised; that remains explicit. Do not imply stock or fabricate credentials, exclusivity, reviews or investment outcomes.

After analytics receipt is independently confirmed, compare enquiry starts, completed qualified briefs and report registrations with a comparable prior period. The existing analytics receipt issue is unresolved; this design release does not establish tracking accuracy or performance lift.

## Verification

Production Next build and TypeScript passed. Changed TypeScript files passed ESLint. The existing ten-page local checks passed: headings, canonical URLs, unique metadata, social previews, schema, FAQ consistency, assets, links, security headers, crawl resources and sitemap. Desktop/mobile browser checks and deployment evidence are recorded with the delivery status in the creative handoff folder.
