import rss from '@astrojs/rss';

export function GET() {
  let allPosts = import.meta.glob('./posts/*.md', { eager: true });
  let posts = Object.values(allPosts);

  posts = posts.sort((a, b) => {
    const getPostNumber = (url) => parseInt(url.split('/posts/')[1].split('-')[0]);
    return getPostNumber(b.url) - getPostNumber(a.url);
  });

  // Only 12 are kept
  posts = posts.slice(0, 12);

  return rss({
    title: '每週趣事',
    description: '記錄 Liam 每週趣事',
    site: 'https://weekly.biyongyao.com/',
    customData: `<image><url>https://gz-blog-storage-1252787757.cos.ap-guangzhou.myqcloud.com/public/weekly-512x512.png</url></image><follow_challenge><feedId>83723980500419584</feedId><userId>83722505120690176</userId></follow_challenge>`,
    items: posts.map((item) => {
      const [issueNumber, issueTitle] = item.url.split('/posts/')[1].split('-');
      const title = `第${issueNumber}期 - ${issueTitle}`;
      return {
        link: item.url,
        title,
        description: item.compiledContent(),
        pubDate: item.frontmatter.date,
      };
    }),
  });
}
