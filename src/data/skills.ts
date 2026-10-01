import type { SkillGroup } from "../types";

export const skillGroups: SkillGroup[] = [
  {
    name: "languages/",
    items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
  },
  {
    name: "frontend/",
    items: [
      "React",
      "React Router",
      "Tailwind CSS",
      "Recharts",
      "Responsive Design",
    ],
  },
  {
    name: "concepts/",
    items: [
      "Component-Based Architecture",
      "State Management",
      "REST API Integration",
      "Debouncing",
      "Type-Safe Code",
      "Loading & Error States",
    ],
  },
  {
    name: "cms/",
    items: [
      "WordPress",
      "Theme Customization",
      "Plugin Development",
      "E-Commerce Setup",
    ],
  },
  {
    name: "tools/",
    items: ["Git", "GitHub", "GitHub Pages", "Vite", "Vercel", "VS Code"],
  },
];
