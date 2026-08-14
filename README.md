# SANKALP — Jesan Steel Works

Premium, responsive static website for SANKALP steel furniture, a brand of Jesan Steel Works in Hoshiarpur.

## Latest client text and photo revision — 10 August 2026

- Connected every Instagram button to `https://www.instagram.com/jesansteelworks?utm_source=qr`.
- Replaced the SANKALP wordmark across all five page headers with the newly supplied “a brand of Jesan Steel Works” artwork.
- Restored the newly supplied original showroom-interior photograph everywhere the shared image appears.
- Added the updated raw-material collage, bending collage and outdoor showroom photograph.
- Added the showroom address to the shared top ribbon on all five pages.
- Updated the Infrastructure hero line to “Follow the complete product making process.”
- Reordered every almirah model name so its specification comes first and “ALMIRAH” appears last.
- Removed “2004” from the first owner-detail paragraph and changed the repeated owner name to “he has” in the next paragraph.

## Easy file structure

- `index.html` — Home page
- `infrastructure.html` — 10-step furniture-making process
- `styles.css` — complete responsive design for every page
- `script.js` — navigation, enquiry form, animations and contact actions
- `site-config.js` — shared phone, WhatsApp, address and brand settings
- `assets/images/` — all website images

This is a plain HTML/CSS/JavaScript website. It does not use React, Next.js, Node.js, npm or a database, and no local build command is required.

## Editing and previewing

Edit the files directly, then open `index.html` in a browser. Business details should be changed only in `site-config.js`.

## GitHub Pages

Every push to `main` automatically publishes the root static files through GitHub Pages. The compatibility file at `infrastructure/index.html` keeps the previously shared `/infrastructure/` link working.


## Review update — 07 Aug 2026
- Corrected showroom address to V.P.O. New Colony Chohal, Near Hotel Royal Plaza, Hoshiarpur 146024.
- Added compact working call/contact controls in every footer.
- Repaired main and footer navigation links to the actual standalone pages.
- Enhanced Infrastructure with richer step copy, animated current-step rail, framed workshop imagery, hover/reveal effects and process notes.
- Upgraded Home-page typography using Playfair Display + Manrope with system fallbacks.


## Products catalogue
- `products.html` — searchable catalogue with 2-column mobile grid and detail dialog.
- `products.html` contains the current static-first 34-product catalogue so it also works when opened directly.
- `products-data.js` is a reference copy of catalogue data and is not loaded at runtime.
- `products.css` / `products.js` — catalogue layout and interactions.

## Product interaction reliability fix — 07 Aug 2026
- Replaced the native `<dialog>` dependency with a browser-compatible modal overlay.
- Clicking anywhere on a product card or the `View details` button opens the product detail window.
- Product modal supports Studio View / Specifications switching, WhatsApp enquiry, Call Now, backdrop close and Escape close.
- Product search runs directly in `products.html` and filters product name, size, category, description and features.
- Search icon is always visible; clear-search appears only when text is entered.
- Every product card keeps its own working WhatsApp enquiry link.
- Critical Products-page interaction JavaScript is embedded in `products.html` for reliable local-folder previewing; `products.js` remains as a compatibility/reference file.

## Major UI consistency update — 08 Aug 2026
- Added the same simple scrolling information line to Home, Products, Infrastructure, About and Contact.
- Ticker now uses a solid SANKALP blue background with white text on every main page.
- Renamed the floating `Showroom` action to `Location` and refreshed the three quick-action buttons: blue Location, cream Call, official green WhatsApp.
- Standardized icons and mobile behavior for the quick-action buttons on all pages.
- Simplified the About hero to a clean `About Us` heading and one owner photograph with no overlapping image treatment.
- Simplified the Contact intro to a clean `Contact Us` heading and short direct description.

## 2026-08-08 latest update
- Replaced the JSW logo on all pages with the newly supplied logo artwork (transparent website asset derived from the exact upload; original upload is retained in assets/images/).
- Updated showroom hours site-wide to 9 AM to 7 PM.
- Corrected the Home showroom/storefront frame address to V.P.O. New Colony Chohal, Near Hotel Royal Plaza, Hoshiarpur 146024.

## Photo update — 10 Aug 2026
- Replaced the Infrastructure raw-material image with a two-photo workshop collage.
- Replaced the Infrastructure bending image with a two-photo machine-work collage.
- Replaced the outdoor storefront photograph wherever it appears on Home, About and Contact.
- Preserved the original storefront signboard lettering and real workshop details.

## Client revision — 09 Aug 2026
- Replaced the scrolling ticker with a static sticky top ribbon showing the new phone number, Instagram placeholder and working WhatsApp action.
- Updated phone/WhatsApp to +91 76969 52500 and added jswhsp@gmail.com across Contact and the footer.
- Enlarged the main header and added a thin fixed navy divider under it.
- Added JESAN STEEL WORKS above the Home hero slogan and removed the old owner/company stamp.
- Added Home trust highlights: 2000+ Customers, 25+ Designs, 100% Strength Guarantee and 5+ Years Manufacturing.
- Rebuilt the footer as a larger text-only corporate directory with company, product, contact and social links.
- Floating Location / Call / WhatsApp controls automatically hide while the footer is visible.
- Contact map heading now reads Jesan Steel Works Hoshiarpur.
- Infrastructure slogan punctuation updated to “Steel shaped with purpose.”
- Footer product-category links can open the Products page with the relevant category selected.
- Instagram is connected through `site-config.js`; Facebook remains intentionally blank until the client supplies it.
