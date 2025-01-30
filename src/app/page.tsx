"use client";
import { useState, useEffect, Suspense } from "react";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PDFViewer from "@/components/PDFViewer";
import Form from "@/components/Form";
import { updatePdf } from "@/utils/pdfUtils";
import Footer from "@/components/Footer";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    CountryOfOriginOfGoods1: searchParams.get("CountryOfOriginOfGoods1") || "",
    contentDescription2: searchParams.get("contentDescription2") || "",
    quantity2: searchParams.get("quantity2") || "",
    netWeight2: searchParams.get("netWeight2") || "",
    value2: searchParams.get("value2") || "",
    HSTariffNumber2: searchParams.get("HSTariffNumber2") || "",
    CountryOfOriginOfGoods2: searchParams.get("CountryOfOriginOfGoods2") || "",
    contentDescription3: searchParams.get("contentDescription3") || "",
    quantity3: searchParams.get("quantity3") || "",
    netWeight3: searchParams.get("netWeight3") || "",
    value3: searchParams.get("value3") || "",
    HSTariffNumber3: searchParams.get("HSTariffNumber3") || "",
    CountryOfOriginOfGoods3: searchParams.get("CountryOfOriginOfGoods3") || "",
    contentDescription4: searchParams.get("contentDescription4") || "",
    quantity4: searchParams.get("quantity4") || "",
    netWeight4: searchParams.get("netWeight4") || "",
    value4: searchParams.get("value4") || "",
    HSTariffNumber4: searchParams.get("HSTariffNumber4") || "",
    CountryOfOriginOfGoods4: searchParams.get("CountryOfOriginOfGoods4") || "",
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
    date: searchParams.get("date") || "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [pdfUrl, setPdfUrl] = useState<string | null>("/assets/docs/cn23.pdf");

  useEffect(() => {
    if (pdfUrl) {
      updatePdf(pdfUrl, { ...formData }, setPdfUrl);
    }
  }, [formData]);

  useEffect(() => {
    const query = new URLSearchParams(
      Object.entries(formData).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    router.replace(`?${query}`, undefined);
  }, [formData]);

  return (
    <div className="flex flex-col justify-center items-center md:h-screen bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white">
      <div className="flex flex-col md:flex-row items-stretch w-full h-screen gap-4 md:p-8">
        <div className="basis-2/3 md:basis-3/5 overflow-y-scroll rounded-lg bg-white dark:bg-neutral-800">
          <Form formData={{ ...formData }} setFormData={setFormData} />
        </div>
        <div className="flex flex-col justify-between w-full h-full basis-1/3 md:basis-2/5">
          {pdfUrl && <PDFViewer pdfUrl={pdfUrl} />}
          <Footer />
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
