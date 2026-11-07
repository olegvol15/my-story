import { getCollection, type CollectionEntry } from "astro:content";

type Project = CollectionEntry<"projects">;
type TicketStatus = Project["data"]["tickets"][number]["status"];

export const statusLabel: Record<Project["data"]["status"], string> = {
  building: "Building",
  live: "Live",
  paused: "Paused",
  archived: "Archived",
};

export const columns: { status: TicketStatus; label: string }[] = [
  { status: "backlog", label: "Backlog" },
  { status: "in-progress", label: "In progress" },
  { status: "done", label: "Done" },
];

export const tickets = (project: Project) => {
  const prefix = project.data.key ?? project.id.replace(/[^a-z0-9]/gi, "").slice(0, 3).toUpperCase();
  return project.data.tickets.map((ticket, i) => ({ ...ticket, key: `${prefix}-${i + 1}` }));
};

export const board = (project: Project) => {
  const all = tickets(project);
  return columns.map((column) => {
    const items = all.filter((t) => t.status === column.status);
    if (column.status === "done") {
      items.reverse().sort((a, b) => (b.done?.valueOf() ?? 0) - (a.done?.valueOf() ?? 0));
    }
    return { ...column, items };
  });
};

export const lastActivity = (project: Project) =>
  project.data.tickets.reduce<Date>(
    (latest, t) => (t.done && t.done > latest ? t.done : latest),
    project.data.started,
  );

export const getPublishedProjects = async () =>
  (await getCollection("projects", ({ data }) => !data.draft)).sort(
    (a, b) => lastActivity(b).valueOf() - lastActivity(a).valueOf(),
  );
