import rss from "@astrojs/rss";
import { SITE, SITE_I18N, RSS_CONFIG } from "../../config";
import { getPostNumber, getTitlePart, formatPostTitle, sortPosts } from "../../util";

export function GET() {
  let allPosts = import.meta.glob("./posts/*.md", { eager: true });
  let posts = sortPosts(Object.values(allPosts)).slice(0, RSS_CONFIG.maxItems);

  return rss({
    title: SITE_I18N.en.title,
    description: SITE_I18N.en.description,
    site: `${SITE.homePage}/en/`,
    items: posts.map((item) => {
      const postNumber = getPostNumber(item.file);
      const titlePart = getTitlePart(item.file);
      const title = formatPostTitle(postNumber, titlePart);

      return {
        title: String(title),
        description: String(item.frontmatter?.desc || SITE_I18N.en.description),
        link: `/en/posts/${postNumber}`,
        pubDate: new Date(item.frontmatter.date),
      };
    }),
  });
}
