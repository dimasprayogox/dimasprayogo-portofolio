import { Experience } from "@/types";

export const MOCK_EXPERIENCES: Experience[] = [
  {
    id: "1",
    role: "Full Stack Web Developer",
    company: "Independent / Freelance",
    period: "2024 — Present",
    description: [
      "Architected and deployed custom web applications for client projects using Next.js, TypeScript, and Supabase.",
      "Built real-time features including RSVP management, authentication flows, and interactive dashboards.",
      "Optimized site performance achieving 95+ Google Lighthouse scores across desktop and mobile devices.",
    ],
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
  },
  {
    id: "2",
    role: "Frontend Developer",
    company: "Tech Solutions",
    period: "2023 — 2024",
    description: [
      "Developed responsive client-facing user interfaces using React and modern CSS design systems.",
      "Integrated REST APIs, managed complex client-side state, and implemented rigorous unit tests.",
      "Collaborated closely with UX designers to refine brand aesthetics and interactive micro-components.",
    ],
    skills: ["React", "JavaScript", "Tailwind CSS", "REST APIs", "Git"],
  },
];
