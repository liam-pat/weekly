import { createRss } from "@/rss";

export function GET() {
  const posts = Object.values(
    import.meta.glob("./posts/*.md", { eager: true }),
  );
  return createRss("zh", posts);
}
