export const profile = {
  name: "Pravakar Thapa",
  shortName: "PT",
  title: "Software Developer",
  location: "Darjeeling, India",
  email: "pravakar.thapa.dev@gmail.com",
  github: "https://github.com/pravakar-thapa",
  githubUser: "pravakar-thapa",
  linkedin: "https://linkedin.com/in/pravakarthapa",
} as const;

export const GITHUB_TOPICS = {
  include: "portfolio",
  featured: "featured",
  hidden: "hidden",
} as const;

export const CONTROL_TOPICS = new Set<string>([
  GITHUB_TOPICS.include,
  GITHUB_TOPICS.featured,
  GITHUB_TOPICS.hidden,
]);

export const SKIP_REPOS = new Set([
  profile.githubUser,
  "pravakar-portfolio",
]);

export type ProjectEnrichment = {
  title?: string;
  description?: string;
  tech?: string[];
  features?: string[];
  live?: string;
  featured?: boolean;
  number?: string;
};

/**
 * Recruiter-facing copy for known projects. Not an allow-list.
 * New public repos appear automatically; add GitHub topic `featured` to pin,
 * or `hidden` to keep a repo off this page.
 */
export const projectEnrichment: Record<string, ProjectEnrichment> = {
  "question-papers": {
    title: "Question Papers Platform",
    description:
      "A full-stack MERN platform for sharing and managing question papers with authentication, uploads, moderation and nested comments.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Cloudinary"],
    features: [
      "20+ REST API endpoints",
      "JWT authentication and RBAC",
      "Admin moderation system",
      "Cloudinary PDF uploads",
      "Nested comments",
      "Server-side validation",
    ],
    live: "https://question-papers-sable.vercel.app",
    featured: true,
    number: "01",
  },
  "weather-application": {
    title: "Weather App",
    description:
      "Responsive weather application using a third-party REST API to display real-time conditions from a city search.",
    tech: ["JavaScript", "HTML", "Bootstrap", "REST API"],
    features: [
      "Real-time weather data",
      "Open-Meteo REST API",
      "City search",
      "Error handling",
      "Responsive interface",
    ],
    live: "https://weatherinhere.netlify.app",
    featured: false,
    number: "02",
  },
  "remote-machine-monitoring": {
    title: "Remote Machine Monitoring",
    description:
      "A compact remote monitoring system for temperature, vibration and power readings.",
    tech: ["Rust"],
    features: [
      "Telemetry for temperature, vibration and power",
      "Designed for remote machine health checks",
    ],
    featured: false,
  },
};

export const skillGroups = [
  {
    title: "Frontend",
    items: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "CRUD Operations",
      "MVC Architecture",
    ],
  },
  {
    title: "Database",
    items: ["MongoDB", "Mongoose"],
  },
  {
    title: "Auth & Security",
    items: ["JWT", "RBAC", "CORS", "Helmet", "Rate Limiting"],
  },
  {
    title: "Cloud & Deploy",
    items: ["Cloudinary", "Vercel", "Netlify", "Render"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Postman"],
  },
] as const;

export const achievements = [
  { value: 6, suffix: "+", label: "Web applications built and deployed" },
  { value: 20, suffix: "+", label: "REST API endpoints in Question Papers" },
  { value: "MERN", suffix: "", label: "Full-stack development experience" },
  { value: 2024, suffix: "", label: "BCA Graduate" },
] as const;

export const experience = {
  role: "Music Instructor",
  type: "Part-time",
  points: [
    "Delivered structured music lessons while developing communication and mentoring skills.",
    "Planned lesson schedules and adapted teaching methods to different learning styles.",
    "Built interpersonal and presentation skills through one-on-one student instruction.",
  ],
} as const;

export const education = {
  degree: "Bachelor of Computer Applications (BCA)",
  institution: "Acharya Institute of Graduate Studies",
  university: "Bangalore University",
  year: "2024",
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;
