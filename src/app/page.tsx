"use client";
import { useState, useEffect, Suspense } from "react";
import * as React from "react";
import { useSearchParams } from "next/navigation";
import PDFViewer from "@/components/PDFViewer";
import Form from "@/components/Form";
import { updatePdf } from "@/utils/pdfUtils";
import Footer from "@/components/Footer";
import {
  isLanguage,
  LANGUAGE_STORAGE_KEY,
  type Language,
} from "@/lib/i18n";

function HomeContent() {
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState<Language>("it");
  const [languageReady, setLanguageReady] = useState(false);
  const initialFormData = {
    senderName: searchParams.get("senderName") || "",
    senderBusiness: searchParams.get("senderBusiness") || "",
    senderStreet: searchParams.get("senderStreet") || "",
    senderPostcode: searchParams.get("senderPostcode") || "",
    senderCity: searchParams.get("senderCity") || "",
    senderCountry: searchParams.get("senderCountry") || "",
    senderCustomsReference: searchParams.get("senderCustomsReference") || "",
    recipientName: searchParams.get("recipientName") || "",
    recipientBusiness: searchParams.get("recipientBusiness") || "",
    recipientStreet: searchParams.get("recipientStreet") || "",
    recipientPostcode: searchParams.get("recipientPostcode") || "",
    recipientCity: searchParams.get("recipientCity") || "",
    recipientCountry: searchParams.get("recipientCountry") || "",
    recipientEmail: searchParams.get("recipientEmail") || "",
    contentDescription1: searchParams.get("contentDescription1") || "",
    quantity1: searchParams.get("quantity1") || "",
    netWeight1: searchParams.get("netWeight1") || "",
    value1: searchParams.get("value1") || "",
    HSTariffNumber1: searchParams.get("HSTariffNumber1") || "",
    countryOfOriginOfGoods1: searchParams.get("countryOfOriginOfGoods1") || "",
    contentDescription2: searchParams.get("contentDescription2") || "",
    quantity2: searchParams.get("quantity2") || "",
    netWeight2: searchParams.get("netWeight2") || "",
    value2: searchParams.get("value2") || "",
    HSTariffNumber2: searchParams.get("HSTariffNumber2") || "",
    countryOfOriginOfGoods2: searchParams.get("countryOfOriginOfGoods2") || "",
    contentDescription3: searchParams.get("contentDescription3") || "",
    quantity3: searchParams.get("quantity3") || "",
    netWeight3: searchParams.get("netWeight3") || "",
    value3: searchParams.get("value3") || "",
    HSTariffNumber3: searchParams.get("HSTariffNumber3") || "",
    countryOfOriginOfGoods3: searchParams.get("countryOfOriginOfGoods3") || "",
    contentDescription4: searchParams.get("contentDescription4") || "",
    quantity4: searchParams.get("quantity4") || "",
    netWeight4: searchParams.get("netWeight4") || "",
    value4: searchParams.get("value4") || "",
    HSTariffNumber4: searchParams.get("HSTariffNumber4") || "",
    countryOfOriginOfGoods4: searchParams.get("countryOfOriginOfGoods4") || "",
    totalWeight: searchParams.get("totalWeight") || "",
    totalValue: searchParams.get("totalValue") || "",
    categoryOfItem: searchParams.get("categoryOfItem") || "",
    explaination: searchParams.get("explaination") || "",
    comments: searchParams.get("comments") || "",
    licence: searchParams.get("licence") === "true" || false,
    licenceNumber: searchParams.get("licenceNumber") || "",
    certificate: searchParams.get("certificate") === "true" || false,
    certificateNumber: searchParams.get("certificateNumber") || "",
    invoice: searchParams.get("invoice") === "true" || false,
    invoiceNumber: searchParams.get("invoiceNumber") || "",
    postalCharges: searchParams.get("postalCharges") || "",
    date:
      searchParams.get("date") === "today"
        ? new Date().toLocaleDateString("it-IT")
        : searchParams.get("date") || "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const downloadTriggered = React.useRef(false);

  useEffect(() => {
    document.body.classList.add("homepage-body");

    return () => {
      document.body.classList.remove("homepage-body");
    };
  }, []);

  useEffect(() => {
    try {
      const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      const nextLanguage = isLanguage(storedLanguage) ? storedLanguage : "it";
      setLanguage(nextLanguage);
      document.documentElement.lang = nextLanguage;
    } catch {
      document.documentElement.lang = "it";
    } finally {
      setLanguageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!languageReady) {
      return;
    }

    document.documentElement.lang = language;

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {}
  }, [language, languageReady]);

  useEffect(() => {
    updatePdf("/assets/docs/cn23.pdf", { ...formData }, setPdfUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pdfUrl) {
      updatePdf(pdfUrl, { ...formData }, setPdfUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  useEffect(() => {
    const query = new URLSearchParams(
      Object.entries(formData).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    const delayDebounceFn = setTimeout(() => {
      history.replaceState(null, "", `?${query}`);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [formData]);

  useEffect(() => {
    const downloadParam = searchParams.get("download");
    const shouldDownload = downloadParam === "True" || downloadParam === "true";
    const fileName = `cn23${formData.invoiceNumber && `-${formData.invoiceNumber}`}.pdf`;

    if (shouldDownload && pdfUrl && !downloadTriggered.current) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      downloadTriggered.current = true;
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete("download");
      history.replaceState(null, "", `?${newSearchParams.toString()}`);
    }
  }, [pdfUrl, searchParams, formData.invoiceNumber]);

  return (
    <div className="flex flex-col items-center justify-center bg-neutral-100 text-black dark:bg-neutral-900 dark:text-white md:h-screen">
      <div className="flex flex-col md:flex-row items-stretch w-full md:h-screen gap-4 sm:p-8">
        <div className="border border-neutral-200 dark:border-neutral-800 basis-2/3 md:basis-3/5 overflow-y-scroll rounded-lg text-neutral-950 dark:text-neutral-50 bg-white dark:bg-neutral-950">
          <Form
            formData={{ ...formData }}
            setFormData={setFormData}
            language={language}
            setLanguage={setLanguage}
          />
        </div>
        <div className="flex flex-col justify-end w-full h-full md:basis-2/5">
          {pdfUrl && (
            <PDFViewer
              pdfUrl={pdfUrl}
              invoiceNumber={formData.invoiceNumber}
              language={language}
            />
          )}
          <Footer language={language} onLanguageChange={setLanguage} />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
