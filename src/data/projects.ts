import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "01",
    name: "nexa-styles/",
    description:
      "E-commerce platform developed during my internship at Ratxen Solutions. Built a single checkout flow integrating payment gateway, subscription billing and shipping API modules.",
    tags: ["WordPress", "Payment API", "Subscription", "Shipping API"],
    privateNote: "client project — private repo, no public link",
  },
  {
    id: "02",
    name: "recipe-finder/",
    description:
      "Recipe search app built with React, hitting a live public API. Debounced search, a responsive card grid, a detail modal with full ingredients and instructions, and a favorites system using React state.",
    tags: ["React", "JavaScript", "Tailwind CSS", "REST API"],
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
    name: "expense-tracker/",
    description:
      "Expense tracker built with React and TypeScript — typed Expense and Category interfaces throughout, no \"any\". Category spending chart with Recharts, plus date-range and category filtering with a live-updating total.",
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
    id: "04",
    name: "mva-trust & ncpl/",
    description:
      "Two live production WordPress sites maintained end to end during the internship — theme customization, plugin work and load-time optimization, with 100% uptime across the engagement.",
    tags: ["WordPress", "Theme Dev", "Performance"],
    links: [
      {
        label: "mvatrust.com",
        href: "https://mvatrust.com",
        external: true,
      },
      {
        label: "ncpl.net.in",
        href: "https://ncpl.net.in",
        external: true,
      },
    ],
  },
  {
    id: "05",
    name: "portfolio/",
    description:
      "Personal developer portfolio built from scratch — now rebuilt with React and TypeScript. An interactive terminal interface with command history, autocomplete and keyboard navigation.",
    tags: ["React", "TypeScript", "Vite", "Responsive UI"],
    links: [
      {
        label: "live demo",
        href: "https://abhishek-portfolio-sandy.vercel.app",
        external: true,
      },
      {
        label: "view on github",
        href: "https://github.com/abhishek-29-dev",
        external: true,
      },
    ],
  },
];