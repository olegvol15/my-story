import { getCollection, type CollectionEntry } from "astro:content";

type Project = CollectionEntry<"projects">;

export const statusLabel: Record<Project["data"]["status"], string> = {
  building: "Building",
  live: "Live",
  paused: "Paused",
  archived: "Archived",
};

/** Shipped entries, newest first. */
export const shippedLog = (project: Project) =>
  [...project.data.shipped].sort((a, b) => b.date.valueOf() - a.date.valueOf());

/** Last time something shipped, or the start date if nothing has yet. */
export const lastActivity = (project: Project) =>
  shippedLog(project)[0]?.date ?? project.data.started;

/** Non-draft projects, most recently active first. */
export const getPublishedProjects = async () =>
  (await getCollection("projects", ({ data }) => !data.draft)).sort(
    (a, b) => lastActivity(b).valueOf() - lastActivity(a).valueOf(),
  );
