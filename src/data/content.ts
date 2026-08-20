export const profile = {
  name: "Oleh Volostnykh",
  location: "Wrocław, Poland",
  intro:
    "I build web products end to end — React and TypeScript on the front, Node and Postgres behind it. Six months commercial frontend on a live product, two degrees finished in parallel, and a thesis on what AI coding assistants actually do to the junior developer role.",
  firstName: "Oleh",
  lastName: "Volostnykh",
  email: "olehvolostnykh15@gmail.com",
  tagline: "Software Engineer building web products end to end.",
  milestones: [
    "Six months building frontend on a live product at Elladium Holding",
    "Cut development time for new features by **25%** with a reusable component layer",
    "Dropped unnecessary API requests by **40%** by reworking API data flow",
    "Finished two degrees in parallel, two months apart",
    "Defended a thesis on AI coding assistants and the junior developer role with the top grade",
    "Built **LumiTune**, a full-stack music streaming platform, as the thesis project",
    "Built **IdeaPick**, an AI platform for generating and pressure-testing product ideas",
  ],
  links: [
    { label: "GitHub", href: "https://github.com/olegvol15" },
    { label: "LinkedIn", href: "https://linkedin.com/in/oleh-volostnykh" },
    { label: "Twitter/X", href: "https://x.com/olegvolo15" },
  ],
};

export const timeline = [
  {
    date: "Jun 2026",
    title: "B.S. Business Informatics — Wrocław University of Economics",
    detail:
      "Web & Mobile Application Development. GPA 4.7 / 5.00. Thesis on AI coding assistants and the junior developer role, defended with the top grade.",
  },
  {
    date: "Apr 2026",
    title: "Software Development Diploma — IT-STEP Academy",
    detail:
      "AI & Frontend Engineering. GPA 4.8 / 5.00. Run in parallel with the university degree, finished two months apart.",
  },
  {
    date: "Dec 2025 — May 2026",
    title: "Frontend Developer Intern — Elladium Holding",
    detail:
      "Six months on Xollo, remote. React, TypeScript, Zustand, TanStack Query, Tailwind. Built the reusable component layer that cut development time for new features by 25%, and reworked API data flow to drop unnecessary requests by 40%.",
  },
];

export const projects = [
  {
    name: "IdeaPick",
    blurb:
      "An AI platform that helps developers generate product ideas and pressure-test them before writing any code.",
    stack: "Next.js · TypeScript · Tailwind · OpenAI API · Tavily API · Python",
    hard: "Validation is the hard half. Generating ideas is easy; deciding whether one is worth building means pulling live competitor data and turning it into a judgement the user can act on.",
    href: "https://github.com/olegvol15/ideapickapp",
  },
  {
    name: "LumiTune",
    blurb:
      "A full-stack music streaming platform — playback, playlists, search, albums, podcasts and a user library. My thesis project.",
    stack:
      "React · TypeScript · Express · pnpm workspace · JWT + Passport OAuth · Framer Motion",
    hard: "Audio streaming, properly. Range request support, media uploads and metadata parsing, plus two separate auth flows for users and admins sharing one refresh-token setup.",
    href: "https://github.com/olegvol15",
  },
];
