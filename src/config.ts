// COS (Cloud Object Storage) base URL
const COS_BASE_URL =
  "https://gz-blog-storage-1252787757.cos.ap-guangzhou.myqcloud.com/public";

export const SITE = {
  title: "进度条 7/7",
  author: "Mr.Pat",
  description: "Mr.Pat 每周留白处",
  keywords: "Liam,Weekly",
  icon: `${COS_BASE_URL}/weekly-favicon.ico`,
  pic: `${COS_BASE_URL}/weekly-512x512.png`,
  homePage: "https://weekly.biyongyao.com", // Required for sitemap generation
  blogPage: "https://biyongyao.com",
  repo: "liam-pat/weekly",
  twitterId: "unknown",
};

export const SITE_I18N = {
  zh: {
    htmlLang: "zh-CN",
    title: "进度条 7/7",
    description: "Mr.Pat 每周留白处",
    homePath: "/",
  },
  en: {
    htmlLang: "en",
    title: "Progress Bar 7/7",
    description: "Mr.Pat's weekly notes",
    homePath: "/en/",
  },
} as const;

export type Locale = keyof typeof SITE_I18N;

export const UI_COPY = {
  zh: {
    languageSwitchLabel: "EN",
    languageSwitchTitle: "Switch to English",
    searchLabel: "输入/进行搜索",
    searchDialogLabel: "搜索",
    searchPlaceholder: "搜索潮流内容",
    searchZeroResults: "没有找到 [SEARCH_TERM]",
    searchManyResults: "[COUNT] 条搜索命中 [SEARCH_TERM]",
    searchClear: "清除",
    searchLoadMore: "加载更多结果",
    words: "字",
    readingTime: "阅读时长",
    minutes: "分钟",
    feedDog: "去喂拉布拉多 ❤",
    feedDogTitle: "功能开发中",
    publishedOn: "发布日期：",
    nextPost: "下一篇 |",
    previousPost: "上一篇 |",
    home: "去首页 |",
    siteNavigation: "站点导航",
    imagePreview: "圖片預覽",
    playLivePhoto: "播放 Live Photo",
    close: "關閉",
  },
  en: {
    languageSwitchLabel: "中",
    languageSwitchTitle: "切换至中文",
    searchLabel: "Search",
    searchDialogLabel: "Search",
    searchPlaceholder: "Search Weekly",
    searchZeroResults: "No results for [SEARCH_TERM]",
    searchManyResults: "[COUNT] results for [SEARCH_TERM]",
    searchClear: "Clear",
    searchLoadMore: "Load more",
    words: "words",
    readingTime: "Reading time",
    minutes: "min",
    feedDog: "Feed the Labrador ❤",
    feedDogTitle: "Coming soon",
    publishedOn: "Published on: ",
    nextPost: "Next |",
    previousPost: "Previous |",
    home: "Home |",
    siteNavigation: "Site navigation",
    imagePreview: "Image preview",
    playLivePhoto: "Play Live Photo",
    close: "Close",
  },
} as const;

// Reading speed configuration (characters/words per minute)
export const READING_SPEED = {
  chinese: 300, // Chinese characters per minute
  english: 200, // English words per minute
};

// RSS feed configuration
export const RSS_CONFIG = {
  maxItems: 12, // Maximum number of items in RSS feed
};

// Image lazy loading configuration
export const IMAGE_CONFIG = {
  lazyLoadThreshold: 1, // Images after this index will be lazy loaded (0-indexed)
};

// Giscus comments configuration
export const GISCUS = {
  repo: "liam-pat/weekly",
  repoId: "R_kgDOQpkB2g",
  category: "General",
  categoryId: "DIC_kwDOQpkB2s4Cz3Gz",
  mapping: "specific",
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "zh-CN",
  themes: {
    light: `${COS_BASE_URL}/css/giscus-light.css`,
    dark: `${COS_BASE_URL}/css/giscus-dark.css`,
  },
};
