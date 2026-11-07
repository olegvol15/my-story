import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { profile } from "../data/content";
import { toExcerpt } from "../lib/excerpt";
import { getPublishedPosts } from "../lib/posts";

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

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
