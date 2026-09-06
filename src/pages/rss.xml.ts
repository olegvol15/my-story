import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { profile } from "../data/content";
import { toExcerpt } from "../lib/excerpt";

export async function GET(context: APIContext) {
  const posts = (await getCollection("writing", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: profile.name,
    description: profile.intro,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? toExcerpt(post.body ?? ""),
      link: `/writing/${post.id}/`,
    })),
    customData: "<language>en</language>",
  });
}
