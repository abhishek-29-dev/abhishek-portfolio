import type { SkillGroup } from "../types";

export const skillGroups: SkillGroup[] = [
  {
    name: "frontend/",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "React Hooks",
      "React Router",
      "Tailwind CSS",
      "Flexbox & Grid",
      "Responsive Design",
    ],
  },
  {
    name: "cms/",
    items: ["WordPress", "Custom CSS", "Plugin Development"],
  },
  {
    name: "tools/",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "Vite",
      "Vercel",
      "npm",
      "REST APIs",
    ],
  },
  {
    name: "other/",
    items: ["Recharts", "Fetch / Axios", "Session Storage", "JSON"],
  },
];