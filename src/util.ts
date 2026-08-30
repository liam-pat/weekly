const extractFilename = (path: string): string => {
  const normalizedPath = path.replace(/\/+$/, "");
  const filename = normalizedPath.split("/").pop()?.replace(/\.md$/, "") || "";
  return decodeURIComponent(filename);
};

export const getPostNumber = (pathOrPost: string | any): number => {
  const path =
    typeof pathOrPost === "string"
      ? pathOrPost
      : pathOrPost.file || pathOrPost.url;
  const filename = extractFilename(path);
  return Number.parseInt(filename.split("-")[0], 10);
};

export const getTitlePart = (path: string): string => {
  const filename = extractFilename(path);
  return filename.split("-").slice(1).join("-");
};

export const formatPostTitle = (
  postNumber: number,
  titlePart: string,
): string => {
  return titlePart ? `${postNumber} - ${titlePart}` : `${postNumber}`;
};

export const parseTitle = (currentPage: string): string => {
  return formatPostTitle(getPostNumber(currentPage), getTitlePart(currentPage));
};

export const sortPosts = (allPosts: any[]): any[] => {
  return [...allPosts].sort((a, b) => getPostNumber(b) - getPostNumber(a));
};
