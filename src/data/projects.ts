import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "01",
    name: "expense-tracker/",
    description:
      "Fully typed expense tracker — its own Expense and Category interfaces, no use of any. Spending charts by category with Recharts, date-range and category filters, and a running total.",
    tags: ["React", "TypeScript", "Recharts", "Tailwind CSS"],
    links: [
      {
        label: "live demo",
        href: "https://expense-tracker-eta-two-93.vercel.app",
        external: true,
      },
      {
        label: "view code",
        href: "https://github.com/abhishek-29-dev/expense-tracker",
        external: true,
      },
    ],
  },
  {
    id: "02",
    name: "recipe-finder/",
    description:
      "Responsive recipe search with debounced input, a card grid and a detail modal, powered by TheMealDB API. Favorites built with React state, plus loading skeletons and clear empty and error states so slow or failed requests don't leave users stuck.",
    tags: ["React", "JavaScript", "Tailwind CSS", "TheMealDB API"],
    links: [
      {
        label: "live demo",
        href: "https://recipe-finder-abhi-64da.vercel.app",
        external: true,
      },
      {
        label: "view code",
        href: "https://github.com/abhishek-29-dev/recipe-finder",
        external: true,
      },
    ],
  },
  {
    id: "03",
    name: "terminal-portfolio/",
    description:
      "Interactive terminal-style portfolio with a custom command interpreter and full keyboard navigation, hosted on GitHub Pages.",
    tags: ["React", "TypeScript", "Vite", "CSS"],
    links: [
      {
        label: "live site",
        href: "https://abhishek-29-dev.github.io/abhishek-portfolio/",
        external: true,
      },
      {
        label: "view code",
        href: "https://github.com/abhishek-29-dev/abhishek-portfolio",
        external: true,
      },
    ],
  },
];
