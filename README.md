# SHINCHANxTAMILAN — Hacker/Game Entry Screen

## Files
- `index.html` — entry screen
- `style.css` — neon hacker theme and responsive layout
- `script.js` — Matrix-style falling code, terminal boot logs, loading bar, clock, and transition

## Try it
Open `index.html` in a browser. Type any text into the access field and press ENTER.

## Connect it to your actual website
The form redirects to `home.html` after the access animation. Put your main website page in this folder and name it `home.html`, or edit this line near the end of `script.js`:

`window.location.href = 'home.html';`

If your main site is `main.html`, change it to `window.location.href = 'main.html';`.

## Notes
- This is a visual game-style entrance, not real authentication or hacking.
- Any non-empty text works as the entry code. Do not use this as a real login/security system.
- Google Fonts are loaded from the internet; fallback fonts are included.
