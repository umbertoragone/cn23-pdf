import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export interface BlogPostSummary {
  slug: string;
  translationKey: string;
  title: string;
  description: string;
  publishedAt: string;
}

export interface BlogPost extends BlogPostSummary {
  contentHtml: string;
}

export interface MarkdownDocument {
  contentHtml: string;
  lastUpdated?: string;
}

export type BlogLocale = "it" | "en";

interface BlogFrontmatter {
  translationKey?: string;
  title?: string;
  description?: string;
  publishedAt?: string | Date;
}

export const blogLocales: BlogLocale[] = ["it", "en"];

function getBlogDirectory(locale: BlogLocale): string {
  return path.join(process.cwd(), "contents", "blog", locale);
}

function getPoliciesDirectory(): string {
  return path.join(process.cwd(), "contents", "policies");
}

async function renderMarkdown(content: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);

  return processedContent.toString();
}

function normalizePublishedAt(value?: string | Date): string {
  if (!value) {
    return "1970-01-01";
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return value;
}

function toSummary(slug: string, frontmatter: BlogFrontmatter): BlogPostSummary {
  return {
    slug,
    translationKey: frontmatter.translationKey ?? slug,
    title: frontmatter.title ?? slug,
    description: frontmatter.description ?? "",
    publishedAt: normalizePublishedAt(frontmatter.publishedAt),
  };
}

function sortByDateDesc<T extends { publishedAt: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function isBlogLocale(value: string): value is BlogLocale {
  return blogLocales.includes(value as BlogLocale);
}

export async function getBlogPosts(locale: BlogLocale): Promise<BlogPostSummary[]> {
  const entries = await fs.readdir(getBlogDirectory(locale), {
    withFileTypes: true,
  });
  const posts = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map(async (entry) => {
        const slug = entry.name.replace(/\.md$/, "");
        const filePath = path.join(getBlogDirectory(locale), entry.name);
        const fileContents = await fs.readFile(filePath, "utf8");
        const { data } = matter(fileContents);

        return toSummary(slug, data as BlogFrontmatter);
      })
  );

  return sortByDateDesc(posts);
}

export async function getBlogPost(
  locale: BlogLocale,
  slug: string
): Promise<BlogPost | null> {
  const filePath = path.join(getBlogDirectory(locale), `${slug}.md`);

  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      ...toSummary(slug, data as BlogFrontmatter),
      contentHtml: await renderMarkdown(content),
    };
  } catch {
    return null;
  }
}

export async function getPolicyDocument(
  slug: string
): Promise<MarkdownDocument | null> {
  const filePath = path.join(getPoliciesDirectory(), `${slug}.md`);

  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      lastUpdated:
        typeof data.lastUpdated === "string" ? data.lastUpdated : undefined,
      contentHtml: await renderMarkdown(content),
    };
  } catch {
    return null;
  }
}

export async function getBlogSlugs(locale: BlogLocale): Promise<string[]> {
  const posts = await getBlogPosts(locale);
  return posts.map((post) => post.slug);
}

export async function getBlogPostByTranslationKey(
  locale: BlogLocale,
  translationKey: string
): Promise<BlogPostSummary | null> {
  const posts = await getBlogPosts(locale);
  return posts.find((post) => post.translationKey === translationKey) ?? null;
}

export function formatPublishedDate(date: string, locale: BlogLocale): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
