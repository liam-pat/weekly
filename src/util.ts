// Extract filename from path (works with both file paths and URLs)
// Strip trailing slash first to handle Vercel's trailing-slash redirects (e.g. /posts/49/ -> /posts/49)
const extractFilename = (path: string): string => {
  const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path;
  const filename = normalizedPath.split('/').pop()?.replace('.md', '') || '';
  return decodeURIComponent(filename);
};

// Get post number from path or post object
export const getPostNumber = (pathOrPost: string | any): number => {
  const path = typeof pathOrPost === 'string' ? pathOrPost : (pathOrPost.file || pathOrPost.url);
  const filename = extractFilename(path);
  return parseInt(filename.split('-')[0]);
};

// Get title part (without number) from filename
export const getTitlePart = (path: string): string => {
  const filename = extractFilename(path);
  const parts = filename.split('-');
  return parts.slice(1).join('-');
};

// Format post title with number and title
export const formatPostTitle = (postNumber: number, titlePart: string): string => {
  return titlePart ? `第${postNumber}期 - ${titlePart}` : `第${postNumber}期`;
};

// Legacy: Get post ID from post object
export const getPostId = (post: any): number => {
  return getPostNumber(post);
};

// Legacy: Convert path to formatted title
export const parseTitle = (currentPage: string): string => {
  const postNumber = getPostNumber(currentPage);
  const titlePart = getTitlePart(currentPage);
  let title = formatPostTitle(postNumber, titlePart);

  if (title.endsWith('/')) {
    title = title.slice(0, -1);
  }
  return title;
};

// Legacy: Get the current article number
export const getIndex = (currentPage: string): number => {
  return getPostNumber(currentPage);
};

// Sort all articles by post number (descending)
export const sortPosts = (allPosts: any[]): any[] => {
  return allPosts.sort((a, b) => getPostNumber(b) - getPostNumber(a));
};
