# ShowBio Pvt. Ltd. — Website

Static marketing website for **ShowBio Pvt. Ltd.**, a Hyderabad-based sustainability
consultancy spanning landscaping, AgriTech, horticulture, and green infrastructure.

Live domain: [showbio.in](https://showbio.in)

## Pages

| Page | Description |
|---|---|
| `index.html` | Home — mission, about, verticals overview, leadership, achievements, impact, future plans, contact |
| `showbageecha.html` | ShowBageecha vertical — landscaping & green infrastructure |
| `plantomart.html` | Plantomart vertical — plants & gardening marketplace |
| `ai-robotics.html` | ShowBio AI & Robotics vertical |
| `showplants.html` | ShowPlants vertical — plantation drives & environmental education |

## Structure

```
.
├── index.html
├── showbageecha.html
├── plantomart.html
├── ai-robotics.html
├── showplants.html
├── style.css
├── script.js
├── robots.txt
├── sitemap.xml
└── assets/            # SVG illustrations
```

## Tech

Plain HTML, CSS, and vanilla JavaScript — no build step, no dependencies.

- Nav with a "Verticals" dropdown (hover on desktop, tap on mobile)
- Scroll-reveal animations and animated stat counters
- Floating FAQ chatbot (rule-based quick replies, bottom-right on every page)
- SEO: meta tags, Open Graph, JSON-LD `Organization` schema, `sitemap.xml`, `robots.txt`

## Run locally

No build tools required — just open `index.html` in a browser, or serve the folder
with any static file server, e.g.:

```
npx serve .
```

## Color palette

| Role | Hex |
|---|---|
| Primary green | `#2E7D32` |
| White | `#FFFFFF` |
| Light background | `#F8FAF8` |
| Dark text | `#1F2937` |
| Light gray border | `#E5E7EB` |
