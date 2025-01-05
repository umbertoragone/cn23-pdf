"use client";
import { useState, useEffect, Suspense } from "react";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import PDFViewer from "@/components/PDFViewer";
import Form from "@/components/Form";
import { updatePdf } from "@/utils/pdfUtils";

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
    quantity1: Number(searchParams.get("quantity1")) || 1,
    netWeight1: searchParams.get("netWeight1") || "",
    value1: searchParams.get("value1") || "",
    HSTariffNumber1: searchParams.get("HSTariffNumber1") || "",
    CountryOfOriginOfGoods1: searchParams.get("CountryOfOriginOfGoods1") || "",
    contentDescription2: searchParams.get("contentDescription2") || "",
    quantity2: Number(searchParams.get("quantity2")) || 1,
    netWeight2: searchParams.get("netWeight2") || "",
    value2: searchParams.get("value2") || "",
    HSTariffNumber2: searchParams.get("HSTariffNumber2") || "",
    CountryOfOriginOfGoods2: searchParams.get("CountryOfOriginOfGoods2") || "",
    contentDescription3: searchParams.get("contentDescription3") || "",
    quantity3: Number(searchParams.get("quantity3")) || 1,
    netWeight3: searchParams.get("netWeight3") || "",
    value3: searchParams.get("value3") || "",
    HSTariffNumber3: searchParams.get("HSTariffNumber3") || "",
    CountryOfOriginOfGoods3: searchParams.get("CountryOfOriginOfGoods3") || "",
    contentDescription4: searchParams.get("contentDescription4") || "",
    quantity4: Number(searchParams.get("quantity4")) || 1,
    netWeight4: searchParams.get("netWeight4") || "",
    value4: searchParams.get("value4") || "",
    HSTariffNumber4: searchParams.get("HSTariffNumber4") || "",
    CountryOfOriginOfGoods4: searchParams.get("CountryOfOriginOfGoods4") || "",
    totalWeight: searchParams.get("totalWeight") || "",
    totalValue: "",
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
    <div className="flex flex-col justify-center items-center h-screen bg-neutral-100 dark:bg-neutral-900 p-6">
      <div className="flex flex-col md:flex-row items-stretch w-full h-screen gap-4">
        <div className="order-last md:order-first basis-3/5 overflow-y-scroll">
          <Form formData={{ ...formData }} setFormData={setFormData} />
        </div>
        <div className="order-first md:order-last w-full h-96 basis-2/5 my-auto">
          {pdfUrl && <PDFViewer pdfUrl={pdfUrl} />}
          <div className="flex justify-center items-center mt-4">
            <Button
              className="bg-green-600 font-bold"
              onClick={() => {
                if (pdfUrl) {
                  const link = document.createElement("a");
                  link.href = pdfUrl;
                  link.download = "cn23.pdf";
                  link.click();
                }
              }}
            >
              Download
            </Button>
          </div>
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
