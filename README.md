# Abhishek J — Portfolio

An interactive, terminal-styled developer portfolio built with React. Instead of scrolling through sections, you type commands (or click sidebar shortcuts) to explore projects, skills, and experience.

**Live site:** [abhishek-29-dev.github.io/abhishek-portfolio](https://abhishek-29-dev.github.io/abhishek-portfolio/)

## Features

- Fully functional command-line interface — try `help`, `about`, `skills`, `projects`, `experience`, `certificate`, `resume`, `contact`, `neofetch`
- Command history (↑ / ↓ arrows) and Tab autocomplete, like a real shell
- Sidebar shortcuts for anyone who'd rather click than type
- Boot-up BIOS animation (skippable — press any key)
- Blue / green theme toggle, key-press sound effects, block cursor, and a powerline-style status bar
- Fully responsive, keyboard accessible, and respects reduced-motion preferences

## Tech Stack

- React 19 + TypeScript
- Vite 6 (build tool)
- Google Fonts (JetBrains Mono)

## Run it locally

```bash
git clone https://github.com/abhishek-29-dev/abhishek-portfolio.git
cd abhishek-portfolio
npm install
npm run dev
```

Open the printed local URL. For a production build: `npm run build` (outputs to `docs/`, which GitHub Pages serves).

## Project Structure

```
abhishek-portfolio/
├── src/            # React source (components, hooks, data, styles)
├── public/         # Static assets (resume / certificate PDFs)
├── docs/           # Built output — served by GitHub Pages
├── vite.config.ts
└── package.json
```

## Related Projects

Featured on the site's `projects` command, with live demos and source:

- **[Recipe Finder](https://recipe-finder-abhi-64da.vercel.app)** — React recipe search app with debounced search, favorites, and a live public API. [Code](https://github.com/abhishek-29-dev/recipe-finder)
- **[Expense Tracker](https://expense-tracker-eta-two-93.vercel.app)** — React + TypeScript expense tracker with typed interfaces, category charts, and filtering. [Code](https://github.com/abhishek-29-dev/expense-tracker)

## About Me

Frontend Developer with hands-on experience building production websites, including a full-stack e-commerce platform (payment gateway, subscriptions, shipping API integration) and WordPress-based business sites, plus React/TypeScript projects built independently. BCA graduate, PES University.

- Email: aj29abhishek@gmail.com
- LinkedIn: [linkedin.com/in/abhishek-j-dev](https://www.linkedin.com/in/abhishek-j-dev)
- GitHub: [github.com/abhishek-29-dev](https://github.com/abhishek-29-dev)
