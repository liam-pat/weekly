import fs from "fs";
import path from "node:path";
import { spawn } from "node:child_process";
import dayjs from "dayjs";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "@tailwindcss/vite";
import remarkBreaks from "remark-breaks";
import sitemap from "@astrojs/sitemap";

import { defineConfig } from "astro/config";
import { parse } from "node-html-parser";
import { SITE } from "./src/config";
import { getPostNumber } from "./src/util";

const DEFAULT_FORMAT = "YYYY/MM/DD";
const WEEKLY_REPO_NAME = "liam-pat/weekly";
const START_DATE = "2024-06-06";
const PAGEFIND_DIST_DIR = path.resolve("dist/pagefind");
const PAGEFIND_ENTRY_FILE = path.join(PAGEFIND_DIST_DIR, "pagefind-entry.json");
const ASTRO_CONFIG_FILE = path.resolve("astro.config.mjs");

const PAGEFIND_CONTENT_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".wasm": "application/wasm",
};
const PAGEFIND_INDEX_INPUT = /\/src\/.*\.(?:astro|js|md|ts)$/;

// Vite restarts on config changes, so the new server repairs a stale index.
function searchIndexIsOlderThan(filePath) {
  try {
    return (
      fs.statSync(filePath).mtimeMs > fs.statSync(PAGEFIND_ENTRY_FILE).mtimeMs
    );
  } catch {
    return true;
  }
}

function pagefindDevPlugin() {
  return {
    name: "pagefind-dev-assets",
    apply: "serve",
    configureServer(server) {
      let rebuildTimer;
      let rebuildProcess;
      let rebuildQueued = false;
      let serverClosing = false;

      const rebuildSearchIndex = () => {
        if (serverClosing) return;
        if (rebuildProcess) {
          rebuildQueued = true;
          return;
        }

        console.info("[pagefind] Rebuilding the development search index...");
        const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
        rebuildProcess = spawn(npmCommand, ["run", "build"], {
          cwd: process.cwd(),
          env: process.env,
          stdio: "inherit",
        });

        rebuildProcess.once("error", (error) => {
          console.error("[pagefind] Failed to rebuild the search index", error);
        });
        rebuildProcess.once("close", (exitCode) => {
          rebuildProcess = undefined;
          if (serverClosing) return;

          if (exitCode === 0) {
            console.info("[pagefind] Development search index updated.");
            server.ws.send({ type: "full-reload" });
          } else {
            console.error(
              `[pagefind] Search index rebuild exited with code ${exitCode}.`,
            );
          }

          if (rebuildQueued) {
            rebuildQueued = false;
            rebuildSearchIndex();
          }
        });
      };

      const scheduleSearchIndexRebuild = (filePath) => {
        const normalizedPath = filePath.split(path.sep).join("/");
        if (!PAGEFIND_INDEX_INPUT.test(normalizedPath)) return;

        clearTimeout(rebuildTimer);
        rebuildTimer = setTimeout(rebuildSearchIndex, 300);
      };

      server.watcher.on("add", scheduleSearchIndexRebuild);
      server.watcher.on("change", scheduleSearchIndexRebuild);
      server.watcher.on("unlink", scheduleSearchIndexRebuild);
      if (searchIndexIsOlderThan(ASTRO_CONFIG_FILE)) {
        rebuildTimer = setTimeout(rebuildSearchIndex, 300);
      }
      server.httpServer?.once("close", () => {
        serverClosing = true;
        rebuildQueued = false;
        clearTimeout(rebuildTimer);
        rebuildProcess?.kill();
      });

      server.middlewares.use((request, response, next) => {
        const rawUrl = request.originalUrl ?? request.url ?? "/";
        const rawPathname = rawUrl
          .replace(/^[a-z][a-z\d+.-]*:\/\/[^/]+/i, "")
          .split("?", 1)[0];
        let pathname;
        try {
          pathname = decodeURIComponent(rawPathname);
        } catch {
          response.statusCode = 400;
          response.end();
          return;
        }
        if (!pathname.startsWith("/pagefind/")) return next();

        const relativePath = pathname.slice("/pagefind/".length);
        const filePath = path.resolve(PAGEFIND_DIST_DIR, relativePath);
        if (!filePath.startsWith(`${PAGEFIND_DIST_DIR}${path.sep}`)) {
          response.statusCode = 403;
          response.end();
          return;
        }

        fs.stat(filePath, (statError, stats) => {
          if (statError || !stats.isFile()) {
            response.statusCode = 404;
            response.end();
            return;
          }

          const contentType =
            PAGEFIND_CONTENT_TYPES[path.extname(filePath)] ??
            "application/octet-stream";
          response.setHeader("Content-Type", contentType);
          response.setHeader("Cache-Control", "no-store");
          const stream = fs.createReadStream(filePath);
          stream.once("error", (streamError) => {
            if (streamError.code !== "ENOENT") {
              console.error(
                `[pagefind] Failed to serve ${relativePath}`,
                streamError,
              );
            }

            if (response.headersSent) {
              response.destroy(streamError);
              return;
            }

            response.statusCode = streamError.code === "ENOENT" ? 404 : 500;
            response.end();
          });
          stream.pipe(response);
        });
      });
    },
  };
}

function formatDate(date) {
  return dayjs(date).format(DEFAULT_FORMAT);
}

function getFileCreateDate(filePath) {
  return formatDate(fs.statSync(filePath).birthtime);
}

function getWeeklyDate(num, filePath) {
  return num < 100
    ? formatDate(dayjs(START_DATE).subtract(100 - num, "week"))
    : getFileCreateDate(filePath);
}

function defaultLayoutPlugin() {
  return function (tree, file) {
    const filePath = file.history[0];
    const { frontmatter } = file.data.astro;
    frontmatter.layout = "@layouts/post.astro";

    const isEn =
      filePath.includes("/pages/en/") || filePath.includes("/en/posts/");
    if (isEn) {
      frontmatter.locale = "en";
    }

    if (tree.children[0]?.value && !frontmatter.pic) {
      const imageElement = parse(tree.children[0].value).querySelector("img");
      frontmatter.pic = imageElement?.getAttribute("src");
    }

    if (tree.children[1]?.children[1]?.value) {
      frontmatter.desc = tree.children[1].children[1].value;
    }

    frontmatter.desc =
      frontmatter.desc || (isEn ? "Weekly notes" : SITE.description);
    frontmatter.pic = frontmatter.pic || SITE.pic;

    if (!frontmatter.date) {
      const postNum = getPostNumber(filePath);
      frontmatter.date =
        SITE.repo === WEEKLY_REPO_NAME
          ? getWeeklyDate(postNum, filePath)
          : getFileCreateDate(filePath);
    }
  };
}

export default defineConfig({
  site: SITE.homePage,
  prefetch: true,
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !/\/(?:en\/)?posts\/\d+-/.test(new URL(page).pathname),
    }),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkBreaks, defaultLayoutPlugin],
      gfm: true,
      smartypants: true,
      remarkRehype: {
        allowDangerousHtml: true,
      },
    }),
  },
  vite: {
    plugins: [pagefindDevPlugin(), tailwindcss()],
    server: {
      host: true,
      allowedHosts: ["weekly.orb.local", "apartment.weekly.orb.local"],
    },
  },
});
