import rss from "@astrojs/rss";
import { RSS_CONFIG, SITE, SITE_I18N, type Locale } from "@/config";
import {
  formatPostTitle,
  getPostNumber,
  getTitlePart,
  sortPosts,
} from "@/util";

const ZH_CUSTOM_DATA =
  "<image><url>https://s21.ax1x.com/2025/02/12/pEui5Yd.png</url><title>进度条 7/7</title><link>https://weekly.biyongyao.com</link></image><follow_challenge><feedId>83723980500419584</feedId><userId>83722505120690176</userId></follow_challenge>";

export function createRss(locale: Locale, posts: any[]) {
  const site = SITE_I18N[locale];
  const prefix = locale === "en" ? "/en" : "";

  return rss({
    title: site.title,
    description: site.description,
    site: `${SITE.homePage}${prefix}/`,
    customData: locale === "zh" ? ZH_CUSTOM_DATA : undefined,
    items: sortPosts(posts)
      .slice(0, RSS_CONFIG.maxItems)
      .map((post) => {
        const postNumber = getPostNumber(post);
        return {
          title: formatPostTitle(postNumber, getTitlePart(post.file)),
          description: post.frontmatter?.desc || site.description,
          link: `${prefix}/posts/${postNumber}`,
          pubDate: new Date(post.frontmatter.date),
        };
      }),
  });
}
