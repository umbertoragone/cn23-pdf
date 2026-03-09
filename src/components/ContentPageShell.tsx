import Footer from "@/components/Footer";
import ContentPageBackLink from "@/components/ContentPageBackLink";
import { type Language } from "@/lib/i18n";

interface ContentPageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  backLabel?: string;
  footerLanguage?: Language;
  footerLocalizedPaths?: Partial<Record<Language, string>>;
  children: React.ReactNode;
}

export default function ContentPageShell({
  eyebrow,
  title,
  description,
  footerLanguage = "en",
  footerLocalizedPaths,
  children,
}: ContentPageShellProps) {
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-6">
          <div>
            <ContentPageBackLink defaultLanguage={footerLanguage} />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-neutral-500">
              {eyebrow}
            </p>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {title}
              </h1>
              <p className="max-w-2xl text-base text-neutral-600 dark:text-neutral-300">
                {description}
              </p>
            </div>
          </div>
        </div>
        <main className="flex-1">{children}</main>
        <Footer
          language={footerLanguage}
          localizedPaths={footerLocalizedPaths}
          className="mt-10 px-0"
        />
      </div>
    </div>
  );
}
