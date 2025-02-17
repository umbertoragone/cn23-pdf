"use client";
import { useState, useEffect, Suspense, useRef } from "react";
import * as React from "react";
import { useSearchParams } from "next/navigation";
import PDFViewer from "@/components/PDFViewer";
import Form from "@/components/Form";
import { updatePdf } from "@/utils/pdfUtils";
import Footer from "@/components/Footer";

function HomeContent() {
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
    date: searchParams.get("date") || "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [pdfUrl, setPdfUrl] = useState<string | null>("/assets/docs/cn23.pdf");
  const prevFormDataRef = useRef(formData);

  useEffect(() => {
    if (pdfUrl && prevFormDataRef.current !== formData) {
      updatePdf(pdfUrl, { ...formData }, setPdfUrl);
      prevFormDataRef.current = formData;
    }
  }, [formData, pdfUrl]);

  useEffect(() => {
    const query = new URLSearchParams(
      Object.entries(formData).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    history.replaceState(null, "", `?${query}`);
  }, [formData]);

  return (
    <div className="flex flex-col justify-center items-center md:h-screen bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white">
      <div className="flex flex-col md:flex-row items-stretch w-full md:h-screen gap-4 sm:p-8">
        <div className="border dark:border-neutral-800 basis-2/3 md:basis-3/5 overflow-y-scroll rounded-lg text-neutral-950 dark:text-neutral-50 bg-white dark:bg-neutral-950">
          <Form formData={{ ...formData }} setFormData={setFormData} />
        </div>
        <div className="flex flex-col justify-end w-full h-full md:basis-2/5">
          {pdfUrl && (
            <PDFViewer pdfUrl={pdfUrl} invoiceNumber={formData.invoiceNumber} />
          )}
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
