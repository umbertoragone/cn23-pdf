"use client";
import { useState, useEffect } from "react";
import * as React from "react";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

export default function Home() {
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
    quantity1: searchParams.get("quantity1") || 1,
    netWeight1: searchParams.get("netWeight1") || "",
    value1: searchParams.get("value1") || "",
    HSTariffNumber1: searchParams.get("HSTariffNumber1") || "",
    CountryOfOriginOfGoods1: searchParams.get("CountryOfOriginOfGoods1") || "",
    contentDescription2: searchParams.get("contentDescription2") || "",
    quantity2: searchParams.get("quantity2") || 1,
    netWeight2: searchParams.get("netWeight2") || "",
    value2: searchParams.get("value2") || "",
    HSTariffNumber2: searchParams.get("HSTariffNumber2") || "",
    CountryOfOriginOfGoods2: searchParams.get("CountryOfOriginOfGoods2") || "",
    contentDescription3: searchParams.get("contentDescription3") || "",
    quantity3: searchParams.get("quantity3") || 1,
    netWeight3: searchParams.get("netWeight3") || "",
    value3: searchParams.get("value3") || "",
    HSTariffNumber3: searchParams.get("HSTariffNumber3") || "",
    CountryOfOriginOfGoods3: searchParams.get("CountryOfOriginOfGoods3") || "",
    contentDescription4: searchParams.get("contentDescription4") || "",
    quantity4: searchParams.get("quantity4") || 1,
    netWeight4: searchParams.get("netWeight4") || "",
    value4: searchParams.get("value4") || "",
    HSTariffNumber4: searchParams.get("HSTariffNumber4") || "",
    CountryOfOriginOfGoods4: searchParams.get("CountryOfOriginOfGoods4") || "",
    totalWeight: searchParams.get("totalWeight") || "",
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
  const [date, setDate] = React.useState<Date>();
  const [pdfUrl, setPdfUrl] = useState<string | null>("/assets/docs/cn23.pdf");

  const totalValue =
    (
      (parseInt(formData.value1) || 0) * (Number(formData.quantity1) || 0) +
      (parseInt(formData.value2) || 0) * (Number(formData.quantity2) || 0) +
      (parseInt(formData.value3) || 0) * (Number(formData.quantity3) || 0) +
      (parseInt(formData.value4) || 0) * (Number(formData.quantity4) || 0)
    ).toString() + " EUR";

  const updatePdf = async () => {
    try {
      if (!pdfUrl) {
        console.error("PDF URL is not set.");
        return;
      }

      const originalPdfBytes = await fetch("/assets/docs/cn23.pdf").then(
        (res) => res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(originalPdfBytes);
      const pages = pdfDoc.getPages();
      const page = pages[0];

      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      page.setFont(helveticaFont);

      const {
        senderName,
        senderBusiness,
        senderStreet,
        senderPostcode,
        senderCity,
        senderCountry,
        senderCustomsReference,
        recipientName,
        recipientBusiness,
        recipientStreet,
        recipientPostcode,
        recipientCity,
        recipientCountry,
        recipientEmail,
        contentDescription1,
        quantity1,
        netWeight1,
        value1,
        HSTariffNumber1,
        CountryOfOriginOfGoods1,
        contentDescription2,
        quantity2,
        netWeight2,
        value2,
        HSTariffNumber2,
        CountryOfOriginOfGoods2,
        contentDescription3,
        quantity3,
        netWeight3,
        value3,
        HSTariffNumber3,
        CountryOfOriginOfGoods3,
        contentDescription4,
        quantity4,
        netWeight4,
        value4,
        HSTariffNumber4,
        CountryOfOriginOfGoods4,
        totalWeight,
        categoryOfItem,
        explaination,
        comments,
        licence,
        licenceNumber,
        certificate,
        certificateNumber,
        invoice,
        invoiceNumber,
        postalCharges,
        date,
      } = formData;

      // const totalValue =
      //   (
      //     parseInt(formData.value1) * Number(formData.quantity1) +
      //     parseInt(formData.value2) * Number(formData.quantity2) +
      //     parseInt(formData.value3) * Number(formData.quantity3) +
      //     parseInt(formData.value4) * Number(formData.quantity4)
      //   ).toString() + " EUR";
      const pageHeight = page.getHeight();

      if (senderName) {
        page.drawText(senderName.toUpperCase(), {
          x: 108,
          y: pageHeight - 72,
          size: 10,
        });
      }

      if (senderBusiness) {
        page.drawText(senderBusiness.toUpperCase(), {
          x: 120,
          y: pageHeight - 86,
          size: 10,
        });
      }

      if (senderStreet) {
        page.drawText(senderStreet.toUpperCase(), {
          x: 102,
          y: pageHeight - 101,
          size: 10,
        });
      }

      if (senderPostcode) {
        page.drawText(senderPostcode.toUpperCase(), {
          x: 139,
          y: pageHeight - 116,
          size: 10,
        });
      }

      if (senderCity) {
        page.drawText(senderCity.toUpperCase(), {
          x: 244,
          y: pageHeight - 116,
          size: 10,
        });
      }

      if (senderCountry) {
        page.drawText(senderCountry.toUpperCase(), {
          x: 114,
          y: pageHeight - 131,
          size: 10,
        });
      }

      if (senderCustomsReference) {
        page.drawText(senderCustomsReference.toUpperCase(), {
          x: 278,
          y: pageHeight - 87,
          size: 10,
        });
      }

      if (recipientName) {
        page.drawText(recipientName.toUpperCase(), {
          x: 108,
          y: pageHeight - 146,
          size: 10,
        });
      }

      if (recipientBusiness) {
        page.drawText(recipientBusiness.toUpperCase(), {
          x: 120,
          y: pageHeight - 161,
          size: 10,
        });
      }

      if (recipientStreet) {
        page.drawText(recipientStreet.toUpperCase(), {
          x: 102,
          y: pageHeight - 176,
          size: 10,
        });
      }

      if (recipientPostcode) {
        page.drawText(recipientPostcode.toUpperCase(), {
          x: 139,
          y: pageHeight - 191,
          size: 10,
        });
      }

      if (recipientCity) {
        page.drawText(recipientCity.toUpperCase(), {
          x: 244,
          y: pageHeight - 191,
          size: 10,
        });
      }

      if (recipientCountry) {
        page.drawText(recipientCountry.toUpperCase(), {
          x: 114,
          y: pageHeight - 205,
          size: 10,
        });
      }

      if (recipientEmail) {
        page.drawText(recipientEmail, {
          x: 343,
          y: pageHeight - 191,
          size: 10,
        });
      }

      if (contentDescription1) {
        page.drawText(contentDescription1, {
          x: 74,
          y: pageHeight - 243,
          size: 9.8,
        });
      }

      if (quantity1) {
        page.drawText(quantity1.toString(), {
          x: 246,
          y: pageHeight - 243,
          size: 10,
        });
      }

      if (netWeight1) {
        page.drawText(netWeight1, {
          x: 282,
          y: pageHeight - 243,
          size: 10,
        });
      }

      if (value1) {
        page.drawText(value1, {
          x: 334,
          y: pageHeight - 243,
          size: 10,
        });
      }

      if (HSTariffNumber1) {
        page.drawText(HSTariffNumber1, {
          x: 381,
          y: pageHeight - 243,
          size: 10,
        });
      }

      if (CountryOfOriginOfGoods1) {
        page.drawText(CountryOfOriginOfGoods1.toUpperCase(), {
          x: 499,
          y: pageHeight - 243,
          size: 10,
        });
      }

      if (contentDescription2) {
        page.drawText(contentDescription2, {
          x: 74,
          y: pageHeight - 258,
          size: 9.8,
        });
      }

      if (quantity2) {
        page.drawText(quantity2.toString(), {
          x: 246,
          y: pageHeight - 258,
          size: 10,
        });
      }

      if (netWeight2) {
        page.drawText(netWeight2, {
          x: 282,
          y: pageHeight - 258,
          size: 10,
        });
      }

      if (value2) {
        page.drawText(value2, {
          x: 334,
          y: pageHeight - 258,
          size: 10,
        });
      }

      if (HSTariffNumber2) {
        page.drawText(HSTariffNumber2, {
          x: 381,
          y: pageHeight - 258,
          size: 10,
        });
      }

      if (CountryOfOriginOfGoods2) {
        page.drawText(CountryOfOriginOfGoods2.toUpperCase(), {
          x: 499,
          y: pageHeight - 258,
          size: 10,
        });
      }

      if (contentDescription3) {
        page.drawText(contentDescription3, {
          x: 74,
          y: pageHeight - 272.5,
          size: 9.8,
        });
      }

      if (quantity3) {
        page.drawText(quantity3.toString(), {
          x: 246,
          y: pageHeight - 272.5,
          size: 10,
        });
      }

      if (netWeight3) {
        page.drawText(netWeight3, {
          x: 282,
          y: pageHeight - 272.5,
          size: 10,
        });
      }

      if (value3) {
        page.drawText(value3, {
          x: 334,
          y: pageHeight - 272.5,
          size: 10,
        });
      }

      if (HSTariffNumber3) {
        page.drawText(HSTariffNumber3, {
          x: 381,
          y: pageHeight - 272.5,
          size: 10,
        });
      }

      if (CountryOfOriginOfGoods3) {
        page.drawText(CountryOfOriginOfGoods3.toUpperCase(), {
          x: 499,
          y: pageHeight - 272.5,
          size: 10,
        });
      }

      if (contentDescription4) {
        page.drawText(contentDescription4, {
          x: 74,
          y: pageHeight - 287,
          size: 9.8,
        });
      }

      if (quantity4) {
        page.drawText(quantity4.toString(), {
          x: 246,
          y: pageHeight - 287,
          size: 10,
        });
      }

      if (netWeight4) {
        page.drawText(netWeight4, {
          x: 282,
          y: pageHeight - 287,
          size: 10,
        });
      }

      if (value4) {
        page.drawText(value4, {
          x: 334,
          y: pageHeight - 287,
          size: 10,
        });
      }

      if (HSTariffNumber4) {
        page.drawText(HSTariffNumber4, {
          x: 381,
          y: pageHeight - 287,
          size: 10,
        });
      }

      if (CountryOfOriginOfGoods4) {
        page.drawText(CountryOfOriginOfGoods4.toUpperCase(), {
          x: 499,
          y: pageHeight - 287,
          size: 10,
        });
      }

      if (totalWeight) {
        page.drawText(totalWeight, {
          x: 278,
          y: pageHeight - 307,
          size: 7,
        });
      }

      if (totalValue) {
        page.drawText(totalValue, {
          x: 330,
          y: pageHeight - 307,
          size: 7,
        });
      }

      switch (categoryOfItem) {
        case "gift":
          page.drawText("x", {
            x: 74.7,
            y: pageHeight - 332.7,
            size: 14.1,
          });
          break;
        case "documents":
          page.drawText("x", {
            x: 74.7,
            y: pageHeight - 342.7,
            size: 14.1,
          });
          break;
        case "commercial-sample":
          page.drawText("x", {
            x: 167,
            y: pageHeight - 322.7,
            size: 14.1,
          });
          break;
        case "returned-goods":
          page.drawText("x", {
            x: 167,
            y: pageHeight - 332.7,
            size: 14.1,
          });
          break;
        case "sale-of-goods":
          page.drawText("x", {
            x: 167,
            y: pageHeight - 342.7,
            size: 14.1,
          });
          break;
        case "other":
          page.drawText("x", {
            x: 285,
            y: pageHeight - 317.4,
            size: 14.1,
          });
          break;
        default:
          break;
      }

      if (explaination) {
        page.drawText(explaination.toUpperCase(), {
          x: 284,
          y: pageHeight - 332,
          size: 8,
        });
      }

      if (comments) {
        page.drawText(comments, {
          x: 74,
          y: pageHeight - 365,
          size: 8,
        });
      }

      if (licence) {
        page.drawText("x", {
          x: 74.7,
          y: pageHeight - 409.5,
          size: 14.1,
        });
        if (licenceNumber) {
          page.drawText(licenceNumber, {
            x: 74,
            y: pageHeight - 429,
            size: 10,
          });
        }
      }

      if (certificate) {
        page.drawText("x", {
          x: 180.4,
          y: pageHeight - 409.5,
          size: 14.1,
        });
        if (certificateNumber) {
          page.drawText(certificateNumber, {
            x: 179.7,
            y: pageHeight - 429,
            size: 10,
          });
        }
      }

      if (invoice) {
        page.drawText("x", {
          x: 282.7,
          y: pageHeight - 409.5,
          size: 14.1,
        });
        page.drawText(invoiceNumber, {
          x: 282,
          y: pageHeight - 429,
          size: 10,
        });
      }

      if (postalCharges) {
        page.drawText(postalCharges, {
          x: 381,
          y: pageHeight - 305,
          size: 10,
        });
      }

      if (date) {
        page.drawText(date, {
          x: 381,
          y: pageHeight - 425,
          size: 14,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const pdfUrlObject = URL.createObjectURL(blob);
      setPdfUrl(pdfUrlObject);
    } catch (error) {
      console.error("Error updating PDF:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    updatePdf();
  }, [formData, date]);

  useEffect(() => {
    const query = new URLSearchParams(
      Object.entries(formData).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    router.replace(`?${query}`, undefined);
  }, [formData, date]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-neutral-100 dark:bg-neutral-900 p-6">
      {/* <div className="grid grid-rows w-full gap-4"> */}
      <div className="flex flex-col md:flex-row items-stretch w-full h-screen gap-4">
        {/* <div className="order-last md:order-first col-span-3 overflow-y-scroll"> */}
        <div className="order-last md:order-first basis-3/5 overflow-y-scroll">
          <form className="bg-white dark:bg-neutral-800 rounded-lg p-6">
            <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
              CN23 PDF Generator
            </h1>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-bold">Sender</p>
                <div className="mb-2">
                  <Label htmlFor="senderName" className="font-semibold">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="senderName"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleChange}
                    autoComplete="name"
                    className="border border-gray-300 rounded w-full bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div className="mb-2">
                  <Label htmlFor="senderBusiness" className="font-semibold">
                    Business
                  </Label>
                  <Input
                    type="text"
                    name="senderBusiness"
                    id="senderBusiness"
                    value={formData.senderBusiness}
                    onChange={handleChange}
                    className="border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div className="mb-2">
                  <Label htmlFor="senderStreet" className="font-semibold">
                    Street
                  </Label>
                  <Input
                    type="text"
                    name="senderStreet"
                    id="senderStreet"
                    value={formData.senderStreet}
                    onChange={handleChange}
                    className="border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div className="mb-2">
                  <Label htmlFor="senderPostcode" className="font-semibold">
                    Postcode
                  </Label>
                  <Input
                    type="text"
                    name="senderPostcode"
                    id="senderPostcode"
                    value={formData.senderPostcode}
                    onChange={handleChange}
                    className="border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div className="mb-2">
                  <Label htmlFor="senderCity" className="font-semibold">
                    City
                  </Label>
                  <Input
                    type="text"
                    name="senderCity"
                    id="senderCity"
                    value={formData.senderCity}
                    onChange={handleChange}
                    className="border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div className="mb-2">
                  <Label htmlFor="senderCountry" className="font-semibold">
                    Country
                  </Label>
                  <Input
                    type="text"
                    name="senderCountry"
                    id="senderCountry"
                    value={formData.senderCountry}
                    onChange={handleChange}
                    className="border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="senderCustomsReference"
                    className="font-semibold"
                  >
                    Customs reference
                  </Label>
                  <Input
                    type="text"
                    name="senderCustomsReference"
                    id="senderCustomsReference"
                    value={formData.senderCustomsReference}
                    onChange={handleChange}
                    className="border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
              </div>
              <div>
                <p className="font-bold">Recipient</p>
                <div className="mb-2">
                  <Label htmlFor="recipientName" className="font-semibold">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="recipientName"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
                    className="px-2 border border-gray-300 rounded w-full bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div className="mb-2">
                  <Label htmlFor="recipientBusiness" className="font-semibold">
                    Business
                  </Label>
                  <Input
                    type="text"
                    name="recipientBusiness"
                    id="recipientBusiness"
                    value={formData.recipientBusiness}
                    onChange={handleChange}
                    className="border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div className="mb-2">
                  <Label htmlFor="recipientStreet" className="font-semibold">
                    Street
                  </Label>
                  <Input
                    type="text"
                    name="recipientStreet"
                    id="recipientStreet"
                    value={formData.recipientStreet}
                    onChange={handleChange}
                    className="border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div className="mb-2">
                  <Label htmlFor="recipientPostcode" className="font-semibold">
                    Postcode
                  </Label>
                  <Input
                    type="text"
                    name="recipientPostcode"
                    id="recipientPostcode"
                    value={formData.recipientPostcode}
                    onChange={handleChange}
                    className="border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div className="mb-2">
                  <Label htmlFor="recipientCity" className="font-semibold">
                    City
                  </Label>
                  <Input
                    type="text"
                    name="recipientCity"
                    id="recipientCity"
                    value={formData.recipientCity}
                    onChange={handleChange}
                    className="border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div className="mb-2">
                  <Label htmlFor="recipientCountry" className="font-semibold">
                    Country
                  </Label>
                  <Input
                    type="text"
                    name="recipientCountry"
                    id="recipientCountry"
                    value={formData.recipientCountry}
                    onChange={handleChange}
                    className="border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div>
                  <Label htmlFor="recipientEmail" className="font-semibold">
                    Recipient email
                  </Label>
                  <Input
                    type="text"
                    name="recipientEmail"
                    id="recipientEmail"
                    value={formData.recipientEmail}
                    onChange={handleChange}
                    className="border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
              </div>
            </div>
            <hr className="col-span-2 mb-4" />
            <div className="grid grid-cols-7 gap-4 mb-2">
              <div className="col-span-2">
                <Label htmlFor="contentDescription1" className="font-semibold">
                  Description
                </Label>
                <Input
                  type="text"
                  name="contentDescription1"
                  id="contentDescription1"
                  value={formData.contentDescription1}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label htmlFor="quantity1" className="font-semibold">
                  Qty
                </Label>
                <Input
                  type="number"
                  name="quantity1"
                  id="quantity1"
                  value={formData.quantity1}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label htmlFor="netWeight1" className="font-semibold">
                  Net weight
                </Label>
                <Input
                  type="text"
                  name="netWeight1"
                  id="netWeight1"
                  value={formData.netWeight1}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label htmlFor="value1" className="font-semibold">
                  Value
                </Label>
                <Input
                  type="text"
                  name="value1"
                  id="value1"
                  value={formData.value1}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label htmlFor="HSTariffNumber1" className="font-semibold">
                  HS tariff #
                </Label>
                <Input
                  type="text"
                  name="HSTariffNumber1"
                  id="HSTariffNumber1"
                  value={formData.HSTariffNumber1}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label
                  htmlFor="CountryOfOriginOfGoods1"
                  className="font-semibold"
                >
                  Country
                </Label>
                <Input
                  type="text"
                  name="CountryOfOriginOfGoods1"
                  id="CountryOfOriginOfGoods1"
                  value={formData.CountryOfOriginOfGoods1}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
            </div>
            <div className="grid grid-cols-7 gap-4 mb-2">
              <div className="col-span-2">
                <Label htmlFor="contentDescription2" className="font-semibold">
                  Description
                </Label>
                <Input
                  type="text"
                  name="contentDescription2"
                  id="contentDescription2"
                  value={formData.contentDescription2}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label htmlFor="quantity2" className="font-semibold">
                  Qty
                </Label>
                <Input
                  type="number"
                  name="quantity2"
                  id="quantity2"
                  value={formData.quantity2}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label htmlFor="netWeight2" className="font-semibold">
                  Net weight
                </Label>
                <Input
                  type="text"
                  name="netWeight2"
                  id="netWeight2"
                  value={formData.netWeight2}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label htmlFor="value2" className="font-semibold">
                  Value
                </Label>
                <Input
                  type="text"
                  name="value2"
                  id="value2"
                  value={formData.value2}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label htmlFor="HSTariffNumber2" className="font-semibold">
                  HS tariff #
                </Label>
                <Input
                  type="text"
                  name="HSTariffNumber2"
                  id="HSTariffNumber2"
                  value={formData.HSTariffNumber2}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label
                  htmlFor="CountryOfOriginOfGoods2"
                  className="font-semibold"
                >
                  Country
                </Label>
                <Input
                  type="text"
                  name="CountryOfOriginOfGoods2"
                  id="CountryOfOriginOfGoods2"
                  value={formData.CountryOfOriginOfGoods2}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
            </div>
            <div className="grid grid-cols-7 gap-4 mb-2">
              <div className="col-span-2">
                <Label htmlFor="contentDescription3" className="font-semibold">
                  Description
                </Label>
                <Input
                  type="text"
                  name="contentDescription3"
                  id="contentDescription3"
                  value={formData.contentDescription3}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label htmlFor="quantity3" className="font-semibold">
                  Qty
                </Label>
                <Input
                  type="number"
                  name="quantity3"
                  id="quantity3"
                  value={formData.quantity3}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label htmlFor="netWeight3" className="font-semibold">
                  Net weight
                </Label>
                <Input
                  type="text"
                  name="netWeight3"
                  id="netWeight3"
                  value={formData.netWeight3}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label htmlFor="value3" className="font-semibold">
                  Value
                </Label>
                <Input
                  type="text"
                  name="value3"
                  id="value3"
                  value={formData.value3}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label htmlFor="HSTariffNumber3" className="font-semibold">
                  HS tariff #
                </Label>
                <Input
                  type="text"
                  name="HSTariffNumber3"
                  id="HSTariffNumber3"
                  value={formData.HSTariffNumber3}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label
                  htmlFor="CountryOfOriginOfGoods3"
                  className="font-semibold"
                >
                  Country
                </Label>
                <Input
                  type="text"
                  name="CountryOfOriginOfGoods3"
                  id="CountryOfOriginOfGoods3"
                  value={formData.CountryOfOriginOfGoods3}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
            </div>
            <div className="grid grid-cols-7 gap-4 mb-4">
              <div className="col-span-2">
                <Label htmlFor="contentDescription4" className="font-semibold">
                  Description
                </Label>
                <Input
                  type="text"
                  name="contentDescription4"
                  id="contentDescription4"
                  value={formData.contentDescription4}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label htmlFor="quantity4" className="font-semibold">
                  Qty
                </Label>
                <Input
                  type="number"
                  name="quantity4"
                  id="quantity4"
                  value={formData.quantity4}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label htmlFor="netWeight4" className="font-semibold">
                  Net weight
                </Label>
                <Input
                  type="text"
                  name="netWeight4"
                  id="netWeight4"
                  value={formData.netWeight4}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label htmlFor="value4" className="font-semibold">
                  Value
                </Label>
                <Input
                  type="text"
                  name="value4"
                  id="value4"
                  value={formData.value4}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label htmlFor="HSTariffNumber4" className="font-semibold">
                  HS tariff #
                </Label>
                <Input
                  type="text"
                  name="HSTariffNumber4"
                  id="HSTariffNumber4"
                  value={formData.HSTariffNumber4}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label
                  htmlFor="CountryOfOriginOfGoods4"
                  className="font-semibold"
                >
                  Country
                </Label>
                <Input
                  type="text"
                  name="CountryOfOriginOfGoods4"
                  id="CountryOfOriginOfGoods4"
                  value={formData.CountryOfOriginOfGoods4}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
            </div>
            <hr className="col-span-2 mb-4" />
            <div className="grid grid-cols-4 gap-4 mb-2">
              <div>
                <Label htmlFor="totalWeight" className="font-semibold">
                  Total gross weight
                </Label>
                <Input
                  type="text"
                  name="totalWeight"
                  id="totalWeight"
                  value={formData.totalWeight}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label htmlFor="totalValue" className="font-semibold">
                  Total value
                </Label>
                <Input
                  type="text"
                  name="totalValue"
                  id="totalValue"
                  value={totalValue}
                  disabled
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label htmlFor="postalCharges" className="font-semibold">
                  Postal charges
                </Label>
                <Input
                  type="text"
                  name="postalCharges"
                  id="postalCharges"
                  value={formData.postalCharges}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div className="flex flex-col justify-between">
                <Label className="font-semibold">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`justify-start text-left ${
                        !formData.date && "text-muted-foreground"
                      }`}
                    >
                      {formData.date || <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        setFormData({
                          ...formData,
                          date: selectedDate
                            ? format(selectedDate, "dd/MM/yyyy")
                            : "",
                        });
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <Label className="font-semibold">Category of item</Label>
                <Select
                  name="categoryOfItem"
                  value={formData.categoryOfItem}
                  onValueChange={(value) =>
                    setFormData({ ...formData, categoryOfItem: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="gift">Gift</SelectItem>
                      <SelectItem value="documents">Documents</SelectItem>
                      <SelectItem value="commercial-sample">
                        Commercial sample
                      </SelectItem>
                      <SelectItem value="returned-goods">
                        Returned goods
                      </SelectItem>
                      <SelectItem value="sale-of-goods">
                        Sale of goods
                      </SelectItem>
                      <SelectItem value="other">
                        Other (please specify)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {formData.categoryOfItem === "other" && (
                <div>
                  <Label htmlFor="explaination" className="font-semibold">
                    Explaination
                  </Label>
                  <Input
                    type="text"
                    name="explaination"
                    id="explaination"
                    value={formData.explaination}
                    onChange={handleChange}
                    className="border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="comments" className="font-semibold">
                Comments
              </Label>
              <Input
                type="text"
                name="comments"
                id="comments"
                value={formData.comments}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full text-neutral-900"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  name="licence"
                  id="licence"
                  checked={formData.licence}
                  onCheckedChange={(checked) =>
                    handleChange({
                      target: {
                        name: "licence",
                        value: checked ? "true" : "false",
                        type: "checkbox",
                        checked: checked,
                      },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                <Label htmlFor="licence">Licence</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  name="certificate"
                  id="certificate"
                  checked={formData.certificate}
                  onCheckedChange={(checked) =>
                    handleChange({
                      target: {
                        name: "certificate",
                        value: checked ? "true" : "false",
                        type: "checkbox",
                        checked: checked,
                      },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                <Label htmlFor="certificate">Certificate</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  name="invoice"
                  id="invoice"
                  checked={formData.invoice}
                  onCheckedChange={(checked) =>
                    handleChange({
                      target: {
                        name: "invoice",
                        value: checked ? "true" : "false",
                        type: "checkbox",
                        checked: checked,
                      },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                <Label htmlFor="invoice">Invoice</Label>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                {formData.licence && (
                  <div>
                    <Label htmlFor="licenceNumber" className="font-semibold">
                      Licence number
                    </Label>
                    <Input
                      type="text"
                      name="licenceNumber"
                      id="licenceNumber"
                      value={formData.licenceNumber}
                      onChange={handleChange}
                      className="border border-gray-300 rounded w-full text-neutral-900"
                    />
                  </div>
                )}
              </div>
              <div>
                {formData.certificate && (
                  <div>
                    <Label
                      htmlFor="certificateNumber"
                      className="font-semibold"
                    >
                      Certificate number
                    </Label>
                    <Input
                      type="text"
                      name="certificateNumber"
                      id="certificateNumber"
                      value={formData.certificateNumber}
                      onChange={handleChange}
                      className="border border-gray-300 rounded w-full text-neutral-900"
                    />
                  </div>
                )}
              </div>
              <div>
                {formData.invoice && (
                  <div>
                    <Label htmlFor="invoiceNumber" className="font-semibold">
                      Invoice number
                    </Label>
                    <Input
                      type="text"
                      name="invoiceNumber"
                      id="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={handleChange}
                      className="border border-gray-300 rounded w-full text-neutral-900"
                    />
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
        {/* <div className="order-first md:order-last flex flex-col justify-center items-center col-span-5 md:col-span-2"> */}
        <div className="order-first md:order-last w-full h-96 basis-2/5 my-auto">
          {pdfUrl && (
            <iframe
              src={pdfUrl}
              className="sticky top-1/2 w-full h-full border border-gray-300 rounded-lg m-auto"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}
