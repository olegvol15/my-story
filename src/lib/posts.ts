import { getCollection } from "astro:content";

/** Non-draft writing entries, newest first. */
export const getPublishedPosts = async () =>
  (await getCollection("writing", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/** YYYY-MM-DD, for `<time datetime>`. */
export const toISODate = (date: Date) => date.toISOString().slice(0, 10);
