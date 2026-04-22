# Décorous Plus — Website

**Quality · Luxury · Exclusivity**

Bespoke graduation robe sets with personalised Arabic name embroidery, delivered in Qatar.

---

## Project Structure

```
decorous-plus/
├── index.html                  # Main page
├── README.md                   # This file
└── assets/
    ├── css/
    │   └── styles.css          # All styles (variables, layout, components, responsive)
    ├── js/
    │   └── main.js             # Nav, scroll reveal, form handling, price calculator
    └── images/
        ├── logo.png            # Brand logo mark
        ├── logo-text.png       # Logo with text
        ├── hero-model.png      # Hero section model photo
        ├── product-robe-black.png
        ├── product-sash-black.png
        ├── product-sash-navy.png
        ├── product-set-black.png
        ├── product-set-navy.png
        ├── product-set-white.png
        ├── product-set-white2.png
        ├── product-set-brown.png
        ├── product-set-maroon.png
        ├── product-set-purple.png
        └── addon-velvet-black.png
```

---

## Sections

| Section | ID | Description |
|---|---|---|
| Navigation | `#nav` | Fixed top bar with mobile hamburger |
| Hero | `#hero` | Split layout with model photo |
| What's Included | `#included` | 3-card breakdown (Robe, Hat, Sash) |
| Collections | `#products` | All 6 robe sets with colour swatches |
| Pricing | `#pricing` | Quantity-tier price table + add-ons |
| Size Guide | `#sizes` | XS–XL measurement table |
| Delivery | `#delivery` | Timelines by set type |
| Order Form | `#order` | Full order form with live price estimate |
| Footer | — | Navigation links + contact |

---

## Features

- **Live price calculator** — updates estimated total as quantity/add-on changes
- **Scroll reveal animations** — elements fade in using IntersectionObserver
- **Mobile responsive** — hamburger menu, stacked layouts under 900px
- **Arabic name input** — RTL text field for sash embroidery name
- **No dependencies** — pure HTML, CSS, and vanilla JS

---

## Deploying to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`

---

## Customisation Checklist

Before going live, update these placeholders:

- [ ] `index.html` line ~230: Replace `+974XXXXXXXX` with real WhatsApp number
- [ ] `index.html` line ~232: Replace Instagram handle `decorousplus`
- [ ] `index.html` line ~233: Replace email `hello@decorousplus.qa`
- [ ] `<meta property="og:image">` — update with a hosted image URL for social sharing

---

## Brand Colours

| Name | Hex |
|---|---|
| Black | `#000000` |
| White | `#FFFFFF` |
| Gold | `#c9a84c` |
| Gold Light | `#e8d5a3` |
| Cream | `#f8f5f0` |

---

*Built for Décorous Plus — Doha, Qatar*
