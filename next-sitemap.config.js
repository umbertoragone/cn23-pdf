const fs = require("node:fs/promises");
const path = require("node:path");
const matter = require("gray-matter");

const BLOG_ROOT = path.join(process.cwd(), "contents", "blog");
const SITE_URL = process.env.SITE_URL || "https://cn23.it";

async function getBlogArticleEntries() {
  const localeEntries = await fs.readdir(BLOG_ROOT, { withFileTypes: true });
  const articleEntries = [];

  for (const localeEntry of localeEntries) {
    if (!localeEntry.isDirectory()) {
      continue;
    }

    const locale = localeEntry.name;
    const localeDir = path.join(BLOG_ROOT, locale);
    const files = await fs.readdir(localeDir, { withFileTypes: true });

    for (const file of files) {
      if (!file.isFile() || !file.name.endsWith(".md")) {
        continue;
      }

      const slug = file.name.replace(/\.md$/, "");
      const filePath = path.join(localeDir, file.name);
      const fileContents = await fs.readFile(filePath, "utf8");
      const { data } = matter(fileContents);
      const publishedAt =
        data.publishedAt instanceof Date
          ? data.publishedAt.toISOString()
          : typeof data.publishedAt === "string"
            ? new Date(data.publishedAt).toISOString()
            : undefined;

      articleEntries.push({
        loc: `/blog/${locale}/${slug}`,
        lastmod: publishedAt,
        changefreq: "weekly",
        priority: 0.7,
      });
    }
  }

  return articleEntries;
}

/** @type {import("next-sitemap").IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: false,
  outDir: "public",
  transform: async () => null,
  additionalPaths: async () => getBlogArticleEntries(),
};
