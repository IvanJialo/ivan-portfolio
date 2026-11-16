# Iván Jiménez — Cybersecurity Portfolio

Personal portfolio website focused on my transition from software development into cybersecurity.

Live site:  
https://ivanjialo.github.io/ivan-portfolio/

## About

This portfolio showcases my professional background, technical skills, hands-on projects and cybersecurity learning path.

My current focus areas include:

- Network security
- Threat detection
- Security monitoring
- Incident response
- Digital forensics
- Web application security
- Offensive security fundamentals

## Tech Stack

- Vue.js
- Vite
- Tailwind CSS
- JavaScript
- GitHub Pages

## Highlights

- Responsive portfolio layout
- Brutalist, Neon and Dark visual modes
- English and Spanish content
- Project and lab showcase
- Downloadable CVs
- Contact links

## Contact

LinkedIn:  
https://www.linkedin.com/in/ivanjimenezalonso

Portfolio:  
https://ivanjialo.github.io/ivan-portfolio/

## Contact form (Formspree)

The Vue form posts JSON directly to Formspree, so GitHub Pages needs no backend.
No recipient address or private token is configured in the frontend. `VITE_`
variables are public build-time values, including the form ID.

1. Create a form in your Formspree account and configure/verify the recipient
   there. Copy only the public ID from `https://formspree.io/f/<id>`.
2. Copy `.env.example` to `.env.local` and set `VITE_FORMSPREE_FORM_ID=<id>`.
   Restart Vite after changes. Without a valid ID the form is disabled.
3. Run `pnpm dev`. Test required fields, invalid email and optional subject in
   ES/EN and all three themes. Check mobile and keyboard use. Real submissions
   require the owner's explicit authorization; automated checks mock requests.
4. Confirm the submission in the Formspree dashboard AND the recipient inbox
   (including spam). An accepted API response is not proof of email delivery.
5. Test offline/error handling: text must remain available, and no success should
   appear. A timeout can occur after acceptance; check before resending.
6. Enable the spam protections available for your Formspree plan and configure
   allowed domains if supported (allow localhost while testing). The `_gotcha`
   honeypot and client validation are basic measures, not server-side protection.
7. For a future authorized Pages deployment, add the repository Actions variable
   `VITE_FORMSPREE_FORM_ID`. The workflow passes it to the Vite build. Rebuild to
   change the ID; GitHub Pages has no runtime environment variables.

Do not push to `main` or run the deployment workflow merely to test: the existing
workflow publishes on pushes to `main` and manual dispatch. Local checks do not
prove delivery. `node --test tests/contact.test.js` uses isolated mocked responses
only to verify error handling and request construction; it sends no messages.

## Local validation and review

- `pnpm check`: non-mutating lint, Node tests and production build.
- `pnpm lint:fix`: explicitly opt in to lint autofixes.
- `pnpm dev`: open the printed URL, normally http://localhost:5173/ivan-portfolio/.
- `pnpm preview`: review the production build at http://localhost:4173/ivan-portfolio/.

On Windows with PowerShell script execution disabled, use `pnpm.cmd` instead of
`pnpm`; no execution-policy change is necessary.

Before deployment, the existing Pages workflow now runs `pnpm check`. It still
deploys only on pushes to `main` or manual dispatch. Do not trigger it for a
local review. The two CV files remain in `public/cv/`, and download URLs use
Vite's `BASE_URL` so they work under the Pages repository path.

Review both languages and all three themes, especially the contact form,
keyboard carousel, mobile acronym buttons, external links and reduced-motion
preference. Certifications remain disabled; their draft ES/EN entries require
editorial confirmation before activation.

The detailed technical review is in [docs/technical-review.md](docs/technical-review.md).
