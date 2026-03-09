import type { Metadata } from "next";
import ContentPageShell from "@/components/ContentPageShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "FAQ | Generatore PDF CN23",
  description: "Domande frequenti sul generatore PDF CN23.",
};

const faqItems = [
  {
    question: "A cosa serve questo strumento?",
    answer:
      "Compila nel browser il PDF della dichiarazione doganale CN23 di Poste Italiane, così puoi controllarlo e scaricare rapidamente un file pronto da stampare.",
  },
  {
    question: "I dati della spedizione vengono salvati da qualche parte?",
    answer:
      "Il form gira lato client. L'implementazione attuale aggiorna il PDF nel browser e mantiene lo stato del form nell'URL, così può essere condiviso o riaperto.",
  },
  {
    question: "Posso condividere un CN23 precompilato con un'altra persona?",
    answer:
      "Sì. Mentre modifichi il form, i parametri nella query string vengono aggiornati. Basta copiare l'URL e chi lo apre vedrà gli stessi valori precompilati.",
  },
  {
    question: "Devo comunque verificare manualmente i dati doganali?",
    answer:
      "Sì. Questo strumento aiuta a generare il PDF, ma codici tariffari, descrizioni dei prodotti, valori dichiarati e requisiti del Paese di destinazione devono comunque essere verificati dal mittente.",
  },
  {
    question: "Sostituisce le indicazioni ufficiali di Poste o delle autorità doganali?",
    answer:
      "No. È uno strumento di supporto per compilare il documento. Le indicazioni ufficiali del vettore e delle autorità doganali restano la fonte di riferimento.",
  },
];

export default function FaqPage() {
  return (
    <ContentPageShell
      eyebrow="FAQ"
      title="Risposte alle domande più comuni sul CN23"
      description="Qui trovi una panoramica rapida su come funziona il generatore, come usare la condivisione tramite URL e quali controlli restano manuali."
      backLabel="Torna al generatore"
      footerLanguage="it"
    >
      <Card className="border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <CardHeader>
          <CardTitle className="text-xl">Domande frequenti</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-7">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </ContentPageShell>
  );
}
