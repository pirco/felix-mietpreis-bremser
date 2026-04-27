# Felix – der Mietpreisbremser

A satirical one-page website for Felix, Berlin's self-appointed scourge of overcharging Altbau landlords. Styled like a 1990s American injury-lawyer billboard. Built as a birthday gag.

## Stack

Pure static HTML / CSS / JS. No build step. No framework. No tracking.

```
.
├── index.html
├── styles.css
├── script.js
└── images/
```

## Local preview

Just open `index.html` in a browser, or:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy on Vercel

1. Push this repo to GitHub.
2. In Vercel: **New Project** → import the repo → no settings needed (framework: *Other*).
3. Done. Vercel serves the static files as-is.

Or via CLI:

```bash
npm i -g vercel
vercel
```

## Disclaimer

Parody. Felix is not a lawyer. The phone number is decorative. The lawsuits, however, are real.
