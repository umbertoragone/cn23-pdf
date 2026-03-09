import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPageShell from "@/components/ContentPageShell";
import {
  blogLocales,
  type BlogLocale,
  formatPublishedDate,
  getBlogPosts,
  isBlogLocale,
} from "@/lib/content";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BlogLocalePageProps {
  params: Promise<{ locale: string }>;
}

const copy: Record<
  BlogLocale,
  {
    title: string;
    description: string;
    backLabel: string;
    readHint: string;
    metadataTitle: string;
    metadataDescription: string;
  }
> = {
  it: {
    title: "Guide per le spedizioni con CN23",
    description:
      "Articoli rapidi su compilazione del modulo, link precompilati e errori comuni da evitare.",
    backLabel: "Torna al generatore",
    readHint: "Apri l'articolo completo per i passaggi e gli esempi.",
    metadataTitle: "Blog IT | Generatore PDF CN23",
    metadataDescription: "Guide e aggiornamenti in italiano sul generatore PDF CN23.",
  },
  en: {
    title: "Guides for CN23 shipments",
    description:
      "Short notes on filling the form, sharing pre-filled links, and avoiding common customs mistakes.",
    backLabel: "Back to generator",
    readHint: "Read the full post for the exact steps and examples.",
    metadataTitle: "Blog EN | CN23 PDF Generator",
    metadataDescription: "English guides and updates for the CN23 PDF generator.",
  },
};

export function generateStaticParams() {
  return blogLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: BlogLocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isBlogLocale(locale)) {
    return {
      title: "Blog | CN23 PDF Generator",
    };
  }

  return {
    title: copy[locale].metadataTitle,
    description: copy[locale].metadataDescription,
  };
}

export default async function BlogLocalePage({ params }: BlogLocalePageProps) {
  const { locale } = await params;

  if (!isBlogLocale(locale)) {
    notFound();
  }

  const posts = await getBlogPosts(locale);
  const pageCopy = copy[locale];

  return (
    <ContentPageShell
      eyebrow={`Blog ${locale.toUpperCase()}`}
      title={pageCopy.title}
      description={pageCopy.description}
      backLabel={pageCopy.backLabel}
      footerLanguage={locale}
      footerLocalizedPaths={{
        it: "/blog/it",
        en: "/blog/en",
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${locale}/${post.slug}`}
            className="group block rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-300 dark:focus-visible:ring-neutral-700"
          >
            <Card className="h-full border-neutral-200 bg-white transition-colors group-hover:border-neutral-300 group-hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:group-hover:border-neutral-700 dark:group-hover:bg-neutral-900/80">
              <CardHeader>
                <p className="text-sm text-neutral-500">
                  {formatPublishedDate(post.publishedAt, locale)}
                </p>
                <CardTitle className="text-xl group-hover:underline">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-base leading-7">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  {pageCopy.readHint}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </ContentPageShell>
  );
}
