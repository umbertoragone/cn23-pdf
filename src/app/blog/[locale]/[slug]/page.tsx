import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPageShell from "@/components/ContentPageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  blogLocales,
  type BlogLocale,
  formatPublishedDate,
  getBlogPost,
  getBlogPostByTranslationKey,
  getBlogPosts,
  getBlogSlugs,
  isBlogLocale,
} from "@/lib/content";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const copy: Record<
  BlogLocale,
  {
    backLabel: string;
    metadataNotFound: string;
    morePosts: string;
    eyebrow: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaLabel: string;
  }
> = {
  it: {
    backLabel: "Torna al blog",
    metadataNotFound: "Articolo non trovato | Generatore PDF CN23",
    morePosts: "Altri articoli",
    eyebrow: "Blog",
    ctaTitle: "Prova il generatore gratuitamente",
    ctaDescription:
      "Compila il CN23 nel browser e scarica il PDF pronto da stampare.",
    ctaLabel: "Genera il tuo CN23",
  },
  en: {
    backLabel: "Back to blog",
    metadataNotFound: "Post not found | CN23 PDF Generator",
    morePosts: "More posts",
    eyebrow: "Blog",
    ctaTitle: "Try the generator for free",
    ctaDescription:
      "Fill out the CN23 in your browser and download a PDF ready to print.",
    ctaLabel: "Generate your CN23",
  },
};

export async function generateStaticParams() {
  const params = await Promise.all(
    blogLocales.map(async (locale) => {
      const slugs = await getBlogSlugs(locale);
      return slugs.map((slug) => ({ locale, slug }));
    }),
  );

  return params.flat();
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isBlogLocale(locale)) {
    return {
      title: "Post not found | CN23 PDF Generator",
    };
  }

  const post = await getBlogPost(locale, slug);

  if (!post) {
    return {
      title: copy[locale].metadataNotFound,
    };
  }

  return {
    title: `${post.title} | CN23 PDF Generator`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;

  if (!isBlogLocale(locale)) {
    notFound();
  }

  const [post, posts] = await Promise.all([
    getBlogPost(locale, slug),
    getBlogPosts(locale),
  ]);

  if (!post) {
    notFound();
  }

  const alternateLocale = locale === "it" ? "en" : "it";
  const alternatePost = await getBlogPostByTranslationKey(
    alternateLocale,
    post.translationKey,
  );

  return (
    <ContentPageShell
      eyebrow={copy[locale].eyebrow}
      title={post.title}
      description={post.description}
      backLabel={copy[locale].backLabel}
      backHref={`/blog/${locale}`}
      footerLanguage={locale}
      footerLocalizedPaths={{
        [locale]: `/blog/${locale}/${post.slug}`,
        [alternateLocale]: alternatePost
          ? `/blog/${alternateLocale}/${alternatePost.slug}`
          : `/blog/${alternateLocale}`,
      }}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <Card className="border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <CardHeader className="gap-3 border-b border-neutral-200 dark:border-neutral-800">
            <p className="text-sm text-neutral-500">
              {formatPublishedDate(post.publishedAt, locale)}
            </p>
            <CardTitle className="text-2xl">{post.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <article
              className="prose prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-neutral-950 prose-a:underline prose-a:underline-offset-4 dark:prose-a:text-neutral-50"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
            <div className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-950">
              <div className="space-y-3">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold tracking-tight">
                    {copy[locale].ctaTitle}
                  </h2>
                  <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                    {copy[locale].ctaDescription}
                  </p>
                </div>
                <Button
                  asChild
                  className={cn(
                    "rounded-xl bg-neutral-950 hover:bg-neutral-800 font-semibold text-sm text-white shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-75 cursor-pointer dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 dark:focus:ring-neutral-500",
                  )}
                >
                  <Link href="/">{copy[locale].ctaLabel}</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="h-fit border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <CardHeader>
            <CardTitle className="text-lg">{copy[locale].morePosts}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {posts
              .filter((entry) => entry.slug !== post.slug)
              .slice(0, 3)
              .map((entry) => (
                <div key={entry.slug} className="space-y-1">
                  <Link
                    href={`/blog/${locale}/${entry.slug}`}
                    className="font-medium hover:underline"
                  >
                    {entry.title}
                  </Link>
                  <p className="text-sm text-neutral-500">
                    {formatPublishedDate(entry.publishedAt, locale)}
                  </p>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </ContentPageShell>
  );
}
