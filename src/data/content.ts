export const profile = {
  name: "Oleh Volostnykh",
  location: "Wrocław, Poland",
  intro:
    "I build web products end to end — React and TypeScript on the front, Node and Postgres behind it. Six months commercial frontend on a live product, two degrees finished in parallel, and a thesis on what AI coding assistants actually do to the junior developer role.",
  firstName: "Oleh",
  lastName: "Volostnykh",
  email: "olehvolostnykh15@gmail.com",
  tagline:
    "20 y/o software engineer with big dreams. Building products and documenting the journey.",
  milestones: [
    "Started programming at 17",
    "Entered computer academy to pursue a career of software dev",
    "Moved countries and started two degrees in parallel at 18",
    "Wrote my first commercial code at 19 - Elladium Holding",
    "Cut feature development time by 25% with a reusable component system",
    "Reduced network requests by 40% rebuilding the data layer",
    "Reached 1,000 followers on X building in public at 19",
    "Built a full-stack music streaming platform solo - auth, uploads, audio range streaming",
    "Shipped an AI product from idea to deploy in five weeks - IdeaPick",
    "Wrote a thesis on how AI assistants are changing the junior developer role",
    "Reached 1500 elo on chess.com in blitz",
    "Finished two diplomas within two months of each other - 4.7 and 4.8",
    "Speak four languages - English, Polish, Russian, Ukrainian",
    "Benched 225 and squatted 265 at 19",
    "Have an ambitious goal of becoming fully self-made solopreneur",
  ],
  links: [
    { label: "GitHub", icon: "github", href: "https://github.com/olegvol15" },
    { label: "LinkedIn", icon: "linkedin", href: "https://linkedin.com/in/oleh-volostnykh" },
    { label: "X", icon: "x", href: "https://x.com/olegvolo15" },
    { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/_volostnykh15_/" },
    { label: "TikTok", icon: "tiktok", href: "https://www.tiktok.com/@oleeg15?_r=1&_t=ZS-992z1Psn1N4" },
    { label: "Medium", icon: "medium", href: "https://medium.com/@olehvolostnykh15" },
    { label: "dev.to", icon: "devdotto", href: "https://dev.to/olehvolos" },
    { label: "Substack", icon: "substack", href: "https://substack.com/@olehvolostnykh" },
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
