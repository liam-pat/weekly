import rss from "@astrojs/rss";
import { SITE, SITE_I18N } from "../../config";

export function GET() {
  return rss({
    title: SITE_I18N.en.title,
    description: SITE_I18N.en.description,
    site: SITE.homePage,
    items: [],
  });
}
