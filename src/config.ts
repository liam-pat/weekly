// COS (Cloud Object Storage) base URL
const COS_BASE_URL = 'https://gz-blog-storage-1252787757.cos.ap-guangzhou.myqcloud.com/public';

export const SITE = {
  title: '进度条 7/7',
  author: 'Mr.Pat',
  description: 'Mr.Pat 每周留白处',
  keywords: 'Liam,Weekly',
  icon: `${COS_BASE_URL}/weekly-favicon.ico`,
  pic: `${COS_BASE_URL}/weekly-512x512.png`,
  homePage: 'https://weekly.biyongyao.com',  // Required for sitemap generation
  blogPage: 'https://biyongyao.com',
  repo: 'liam-pat/weekly',
  twitterId: "unknown"
};

// Reading speed configuration (characters/words per minute)
export const READING_SPEED = {
  chinese: 300,  // Chinese characters per minute
  english: 200,  // English words per minute
};

// RSS feed configuration
export const RSS_CONFIG = {
  maxItems: 12,  // Maximum number of items in RSS feed
};

// Image lazy loading configuration
export const IMAGE_CONFIG = {
  lazyLoadThreshold: 1,  // Images after this index will be lazy loaded (0-indexed)
};

// Giscus comments configuration
export const GISCUS = {
  repo: 'liam-pat/weekly',
  repoId: 'R_kgDOQpkB2g',
  category: 'General',
  categoryId: 'DIC_kwDOQpkB2s4Cz3Gz',
  mapping: 'title',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  lang: 'zh-CN',
  themes: {
    light: `${COS_BASE_URL}/css/giscus-light.css`,
    dark: `${COS_BASE_URL}/css/giscus-dark.css`,
  },
};
