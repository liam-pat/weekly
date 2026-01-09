// Helper function to extract and decode the title part from the URL or File Path
const extractTitlePart = (path: string) => {
  // If it's a file path (contains .md)
  if (path.includes('.md')) {
    const filename = path.split('/').pop()?.replace('.md', '') || '';
    return decodeURIComponent(filename);
  }
  // Fallback for URL: /posts/48-Title (Legacy) or /posts/48
  return decodeURIComponent(path.split('/posts/')[1] || '');
};

export const getPostId = (post: any) => {
  const path = post.file || post.url;
  const titlePart = extractTitlePart(path);
  return parseInt(titlePart.split('-')[0]);
};

// Convert to title
export const parseTitle = (currentPage: string) => {
  const oldTitle = extractTitlePart(currentPage);
  if (!oldTitle) return '';
  
  const parts = oldTitle.split('-');
  // If we only have "48" (from /posts/48), we can't show the full title text here.
  // This function is mainly used by legacy components.
  // New components should pass the full title explicitly.
  if (parts.length === 1) {
    return `第${parts[0]}期`; 
  }
  
  let title = `第${parts[0]}期 - ${parts.slice(1).join('-')}`;
  if (title.endsWith('/')) {
    title = title.slice(0, -1);
  }
  return title;
};

// Get the current article number.
export const getIndex = (currentPage: string) => {
  const oldTitle = extractTitlePart(currentPage);
  return parseInt(oldTitle.split('-')[0]);
};

// Sort all articles.
export const sortPosts = (allPosts: any) => {
  return allPosts.sort((a, b) => {
    return getPostId(b) - getPostId(a);
  });
};
