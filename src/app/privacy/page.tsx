import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPageShell from "@/components/ContentPageShell";
import { Card, CardContent } from "@/components/ui/card";
import { getPolicyDocument } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy | Generatore PDF CN23",
  description:
    "Informativa privacy di CN23.it sul funzionamento del servizio e sul trattamento dei dati.",
};

export default async function PrivacyPage() {
  const privacyDocument = await getPolicyDocument("privacy");

  if (!privacyDocument) {
    notFound();
  }

  return (
    <ContentPageShell
      eyebrow="Privacy"
      title="Informativa privacy di CN23.it"
      description="Informazioni essenziali su come funziona il servizio, quali dati vengono trattati e sul ruolo dell'hosting Netlify."
      backLabel="Torna al generatore"
      footerLanguage="it"
    >
      <Card className="border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <CardContent className="pt-6">
          {privacyDocument.lastUpdated ? (
            <p className="mb-4 text-sm text-neutral-500">
              Ultimo aggiornamento: {privacyDocument.lastUpdated}
            </p>
          ) : null}
          <article
            className="prose prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-neutral-950 prose-a:underline prose-a:underline-offset-4 dark:prose-a:text-neutral-50"
            dangerouslySetInnerHTML={{ __html: privacyDocument.contentHtml }}
          />
        </CardContent>
      </Card>
    </ContentPageShell>
  );
}
