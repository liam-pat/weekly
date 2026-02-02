import rss from '@astrojs/rss';
import { SITE, RSS_CONFIG } from '../config';
import { getPostNumber, getTitlePart, formatPostTitle, sortPosts } from '../util';

export function GET() {
  // Get all posts
  let allPosts = import.meta.glob('./posts/*.md', { eager: true });
  let posts = Object.values(allPosts);

  // Sort by post number (descending)
  posts = sortPosts(posts);

  // Only keep the configured maximum number of items
  posts = posts.slice(0, RSS_CONFIG.maxItems);

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.homePage,
    customData: `<image><url>https://s21.ax1x.com/2025/02/12/pEui5Yd.png</url><title>进度条 7/7</title><link>https://weekly.biyongyao.com</link></image><follow_challenge><feedId>83723980500419584</feedId><userId>83722505120690176</userId></follow_challenge>`,
    items: posts.map((item) => {
      const postNumber = getPostNumber(item.file);
      const titlePart = getTitlePart(item.file);
      const title = formatPostTitle(postNumber, titlePart);

      return {
        title: String(title),
        description: String(item.frontmatter?.desc || SITE.description),
        link: `/posts/${postNumber}`,
        pubDate: new Date(item.frontmatter.date),
      };
    }),
  });
}
