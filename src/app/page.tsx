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
    contentDescription: searchParams.get("contentDescription") || "",
    quantity: searchParams.get("quantity") || 1,
    netWeight: searchParams.get("netWeight") || "",
    value: searchParams.get("value") || "",
    HSTariffNumber: searchParams.get("HSTariffNumber") || "",
    CountryOfOriginOfGoods: searchParams.get("CountryOfOriginOfGoods") || "",
    totalWeight: searchParams.get("totalWeight") || "",
    categoryOfItem: searchParams.get("categoryOfItem") || "",
    explaination: searchParams.get("explaination") || "",
    invoice: searchParams.get("invoice") === "true" || false,
    invoiceNumber: searchParams.get("invoiceNumber") || "",
    postalCharges: searchParams.get("postalCharges") || "",
    date: searchParams.get("date") || "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [date, setDate] = React.useState<Date>();
  const [pdfUrl, setPdfUrl] = useState<string | null>("/assets/docs/cn23.pdf");

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
        contentDescription,
        quantity,
        netWeight,
        value,
        HSTariffNumber,
        CountryOfOriginOfGoods,
        totalWeight,
        categoryOfItem,
        explaination,
        invoice,
        invoiceNumber,
        postalCharges,
        date,
      } = formData;

      const totalValue =
        (parseInt(value) * Number(quantity)).toString() + " EUR";
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
          y: pageHeight - 206,
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

      if (contentDescription) {
        page.drawText(contentDescription, {
          x: 74,
          y: pageHeight - 242,
          size: 9.8,
        });
      }

      if (quantity) {
        page.drawText(quantity.toString(), {
          x: 246,
          y: pageHeight - 243,
          size: 10,
        });
      }

      if (netWeight) {
        page.drawText(netWeight, {
          x: 282,
          y: pageHeight - 243,
          size: 10,
        });
      }

      if (value) {
        page.drawText(value, {
          x: 334,
          y: pageHeight - 243,
          size: 10,
        });
      }

      if (HSTariffNumber) {
        page.drawText(HSTariffNumber, {
          x: 381,
          y: pageHeight - 243,
          size: 10,
        });
      }

      if (CountryOfOriginOfGoods) {
        page.drawText(CountryOfOriginOfGoods.toUpperCase(), {
          x: 499,
          y: pageHeight - 243,
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

      if (invoice) {
        page.drawText("x", {
          x: 282.7,
          y: pageHeight - 409.5,
          size: 14.1,
        });
      }

      if (invoiceNumber) {
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
    <div className="flex flex-col justify-center items-center min-h-screen bg-neutral-100 dark:bg-neutral-900 p-6">
      <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
        CN23 PDF
      </h1>
      <div className="grid grid-cols-5 w-full gap-4">
        <div className="col-span-3 overflow-y-scroll">
          <form className="bg-white dark:bg-neutral-800 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-semibold">Sender</p>
                <div>
                  <Label htmlFor="senderName">Name</Label>
                  <Input
                    type="text"
                    id="senderName"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleChange}
                    className="px-2 border border-gray-300 rounded w-full bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div>
                  <Label htmlFor="senderBusiness">Business</Label>
                  <Input
                    type="text"
                    name="senderBusiness"
                    id="senderBusiness"
                    value={formData.senderBusiness}
                    onChange={handleChange}
                    className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div>
                  <Label htmlFor="senderStreet">Street</Label>
                  <Input
                    type="text"
                    name="senderStreet"
                    id="senderStreet"
                    value={formData.senderStreet}
                    onChange={handleChange}
                    className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div>
                  <Label htmlFor="senderPostcode">Postcode</Label>
                  <Input
                    type="text"
                    name="senderPostcode"
                    id="senderPostcode"
                    value={formData.senderPostcode}
                    onChange={handleChange}
                    className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div>
                  <Label htmlFor="senderCity">City</Label>
                  <Input
                    type="text"
                    name="senderCity"
                    id="senderCity"
                    value={formData.senderCity}
                    onChange={handleChange}
                    className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input
                    type="text"
                    name="senderCountry"
                    id="senderCountry"
                    value={formData.senderCountry}
                    onChange={handleChange}
                    className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div>
                  <Label>Customs reference</Label>
                  <Input
                    type="text"
                    name="senderCustomsReference"
                    id="senderCustomsReference"
                    value={formData.senderCustomsReference}
                    onChange={handleChange}
                    className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
              </div>
              <div>
                <p className="font-semibold">Recipient</p>
                <div>
                  <Label htmlFor="recipientName">Name</Label>
                  <Input
                    type="text"
                    id="recipientName"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
                    className="px-2 border border-gray-300 rounded w-full bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div>
                  <Label>Business</Label>
                  <Input
                    type="text"
                    name="recipientBusiness"
                    id="recipientBusiness"
                    value={formData.recipientBusiness}
                    onChange={handleChange}
                    className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div>
                  <Label>Street</Label>
                  <Input
                    type="text"
                    name="recipientStreet"
                    id="recipientStreet"
                    value={formData.recipientStreet}
                    onChange={handleChange}
                    className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div>
                  <Label>Postcode</Label>
                  <Input
                    type="text"
                    name="recipientPostcode"
                    id="recipientPostcode"
                    value={formData.recipientPostcode}
                    onChange={handleChange}
                    className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div>
                  <Label>City</Label>
                  <Input
                    type="text"
                    name="recipientCity"
                    id="recipientCity"
                    value={formData.recipientCity}
                    onChange={handleChange}
                    className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input
                    type="text"
                    name="recipientCountry"
                    id="recipientCountry"
                    value={formData.recipientCountry}
                    onChange={handleChange}
                    className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Recipient email</Label>
                  <Input
                    type="text"
                    name="recipientEmail"
                    id="recipientEmail"
                    value={formData.recipientEmail}
                    onChange={handleChange}
                    className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
              </div>
            </div>
            <hr className="col-span-2 mb-4" />
            <div className="grid grid-cols-7 gap-4 mb-4">
              <div className="col-span-2">
                <Label>Description</Label>
                <Input
                  type="text"
                  name="contentDescription"
                  id="contentDescription"
                  value={formData.contentDescription}
                  onChange={handleChange}
                  className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label>Qty</Label>
                <Input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label>Net weight</Label>
                <Input
                  type="text"
                  name="netWeight"
                  id="netWeight"
                  value={formData.netWeight}
                  onChange={handleChange}
                  className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label>Value</Label>
                <Input
                  type="text"
                  name="value"
                  id="value"
                  value={formData.value}
                  onChange={handleChange}
                  className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label>HS tariff #</Label>
                <Input
                  type="text"
                  name="HSTariffNumber"
                  id="HSTariffNumber"
                  value={formData.HSTariffNumber}
                  onChange={handleChange}
                  className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  type="text"
                  name="CountryOfOriginOfGoods"
                  id="CountryOfOriginOfGoods"
                  value={formData.CountryOfOriginOfGoods}
                  onChange={handleChange}
                  className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Total weight</Label>
                <Input
                  type="text"
                  name="totalWeight"
                  id="totalWeight"
                  value={formData.totalWeight}
                  onChange={handleChange}
                  className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div>
                <Label>Total value</Label>
                <Input
                  type="text"
                  name="totalValue"
                  id="totalValue"
                  value={
                    (
                      parseInt(formData.value) * Number(formData.quantity)
                    ).toString() + " EUR"
                  }
                  disabled
                  className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Category of Item</Label>
                <Select
                  name="categoryOfItem"
                  value={formData.categoryOfItem}
                  onValueChange={(value) =>
                    setFormData({ ...formData, categoryOfItem: value })
                  }
                  className="px-2 border border-gray-300 rounded w-full text-neutral-900"
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
                  <Label>Explaination</Label>
                  <Input
                    type="text"
                    name="explaination"
                    value={formData.explaination}
                    onChange={handleChange}
                    className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-6 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="invoice">Invoice</Label>
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
              </div>
              {formData.invoice && (
                <div>
                  <Label>Invoice number</Label>
                  <Input
                    type="text"
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={handleChange}
                    className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Postal charges</Label>
                <Input
                  type="text"
                  name="postalCharges"
                  value={formData.postalCharges}
                  onChange={handleChange}
                  className="px-2 border border-gray-300 rounded w-full text-neutral-900"
                />
              </div>
              <div className="flex flex-col justify-between">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`justify-start text-left ${
                        !formData.date && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon />
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
          </form>
        </div>
        <div className="flex flex-col justify-center items-center col-span-2">
          {pdfUrl && (
            <iframe
              src={pdfUrl}
              className="w-full h-full border border-gray-300 rounded-lg"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}
