import React, { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import { format } from "date-fns";

interface FormData {
  senderName: string;
  senderBusiness: string;
  senderStreet: string;
  senderPostcode: string;
  senderCity: string;
  senderCountry: string;
  senderCustomsReference: string;
  recipientName: string;
  recipientBusiness: string;
  recipientStreet: string;
  recipientPostcode: string;
  recipientCity: string;
  recipientCountry: string;
  recipientEmail: string;
  contentDescription1: string;
  quantity1: string;
  netWeight1: string;
  value1: string;
  HSTariffNumber1: string;
  countryOfOriginOfGoods1: string;
  contentDescription2: string;
  quantity2: string;
  netWeight2: string;
  value2: string;
  HSTariffNumber2: string;
  countryOfOriginOfGoods2: string;
  contentDescription3: string;
  quantity3: string;
  netWeight3: string;
  value3: string;
  HSTariffNumber3: string;
  countryOfOriginOfGoods3: string;
  contentDescription4: string;
  quantity4: string;
  netWeight4: string;
  value4: string;
  HSTariffNumber4: string;
  countryOfOriginOfGoods4: string;
  totalWeight: string;
  totalValue: string;
  postalCharges: string;
  categoryOfItem: string;
  explaination: string;
  comments: string;
  licence: boolean;
  certificate: boolean;
  invoice: boolean;
  licenceNumber: string;
  certificateNumber: string;
  invoiceNumber: string;
  date: string;
}

interface FormProps {
  formData: FormData;
  setFormData: (formData: FormData) => void;
}

const Form: React.FC<FormProps> = ({ formData, setFormData }) => {
  const explainationRef = useRef<HTMLInputElement>(null);
  const licenceNumberRef = useRef<HTMLInputElement>(null);
  const certificateNumberRef = useRef<HTMLInputElement>(null);
  const invoiceNumberRef = useRef<HTMLInputElement>(null);
  const parseValue = (value: string) =>
    parseFloat(value.replace(/[^\d.-]/g, "")) || 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    let updatedValue = value;

    const fieldsToConvert = [
      "netWeight1",
      "value1",
      "netWeight2",
      "value2",
      "netWeight3",
      "value3",
      "netWeight4",
      "value4",
      "totalWeight",
      "postalCharges",
    ];

    if (fieldsToConvert.includes(name)) {
      updatedValue = value.replace(/,/g, ".");
    }

    const updatedFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : updatedValue,
    };
    const values = [
      parseValue(updatedFormData.value1),
      parseValue(updatedFormData.value2),
      parseValue(updatedFormData.value3),
      parseValue(updatedFormData.value4),
    ];

    const totalValue = values.some((value) => value !== 0)
      ? values.reduce((acc, value) => acc + value, 0).toFixed(2) +
        updatedFormData.value1.replace(/[0-9.]/g, "")
      : "";
    setFormData({
      ...updatedFormData,
      totalValue: totalValue,
    });
  };

  return (
    <form className="p-6">
      <h1 className="text-center text-4xl font-black mb-4">
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
              className="w-full border-input"
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
              className="w-full"
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
              className="w-full"
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
              className="w-full"
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
              className="w-full"
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
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="senderCustomsReference" className="font-semibold">
              Customs reference
            </Label>
            <Input
              type="text"
              name="senderCustomsReference"
              id="senderCustomsReference"
              value={formData.senderCustomsReference}
              onChange={handleChange}
              className="w-full"
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
              autoComplete="off"
              className="px-2 rounded-md w-full dark:text-neutral-100"
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
              autoComplete="off"
              className="w-full"
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
              autoComplete="off"
              className="w-full"
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
              autoComplete="off"
              className="w-full"
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
              autoComplete="off"
              className="w-full"
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
              autoComplete="off"
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="recipientEmail" className="font-semibold">
              Email/Phone number
            </Label>
            <Input
              type="text"
              name="recipientEmail"
              id="recipientEmail"
              value={formData.recipientEmail}
              onChange={handleChange}
              autoComplete="off"
              className="w-full"
            />
          </div>
        </div>
      </div>
      <hr className="border-neutral-200 dark:border-neutral-800 mb-4" />
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-end gap-2 mb-2">
        <div className="w-96">
          <Label htmlFor="contentDescription1" className="font-semibold">
            Description
          </Label>
          <Input
            type="text"
            name="contentDescription1"
            id="contentDescription1"
            value={formData.contentDescription1}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="w-24">
          <Label htmlFor="quantity1" className="font-semibold">
            Qty
          </Label>
          <Input
            type="number"
            name="quantity1"
            id="quantity1"
            min="1"
            value={formData.quantity1}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="w-36">
          <Label htmlFor="netWeight1" className="font-semibold">
            Net weight
          </Label>
          <Input
            type="text"
            name="netWeight1"
            id="netWeight1"
            value={formData.netWeight1}
            onChange={handleChange}
            placeholder="0.000 kg"
            className="w-full"
          />
        </div>
        <div className="w-36">
          <Label htmlFor="value1" className="font-semibold">
            Value
          </Label>
          <Input
            type="text"
            name="value1"
            id="value1"
            value={formData.value1}
            onChange={handleChange}
            placeholder="0.00 EUR"
            className="w-full"
          />
        </div>
        <div className="w-40">
          <Label htmlFor="HSTariffNumber1" className="font-semibold">
            HS tariff #
          </Label>
          <Input
            type="text"
            name="HSTariffNumber1"
            id="HSTariffNumber1"
            value={formData.HSTariffNumber1}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="w-44">
          <Label htmlFor="countryOfOriginOfGoods1" className="font-semibold">
            Country
          </Label>
          <Input
            type="text"
            name="countryOfOriginOfGoods1"
            id="countryOfOriginOfGoods1"
            value={formData.countryOfOriginOfGoods1}
            onChange={handleChange}
            autoComplete="off"
            className="w-full"
          />
        </div>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-end gap-2 mb-2">
        <div className="w-96">
          <Label htmlFor="contentDescription2" className="font-semibold">
            Description
          </Label>
          <Input
            type="text"
            name="contentDescription2"
            id="contentDescription2"
            value={formData.contentDescription2}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="w-24">
          <Label htmlFor="quantity2" className="font-semibold">
            Qty
          </Label>
          <Input
            type="number"
            name="quantity2"
            id="quantity2"
            min="1"
            value={formData.quantity2}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="w-36">
          <Label htmlFor="netWeight2" className="font-semibold">
            Net weight
          </Label>
          <Input
            type="text"
            name="netWeight2"
            id="netWeight2"
            value={formData.netWeight2}
            onChange={handleChange}
            placeholder="0.000 kg"
            className="w-full"
          />
        </div>
        <div className="w-36">
          <Label htmlFor="value2" className="font-semibold">
            Value
          </Label>
          <Input
            type="text"
            name="value2"
            id="value2"
            value={formData.value2}
            onChange={handleChange}
            placeholder="0.00 EUR"
            className="w-full"
          />
        </div>
        <div className="w-40">
          <Label htmlFor="HSTariffNumber2" className="font-semibold">
            HS tariff #
          </Label>
          <Input
            type="text"
            name="HSTariffNumber2"
            id="HSTariffNumber2"
            value={formData.HSTariffNumber2}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="w-44">
          <Label htmlFor="countryOfOriginOfGoods2" className="font-semibold">
            Country
          </Label>
          <Input
            type="text"
            name="countryOfOriginOfGoods2"
            id="countryOfOriginOfGoods2"
            value={formData.countryOfOriginOfGoods2}
            onChange={handleChange}
            autoComplete="off"
            className="w-full"
          />
        </div>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-end gap-2 mb-2">
        <div className="w-96">
          <Label htmlFor="contentDescription3" className="font-semibold">
            Description
          </Label>
          <Input
            type="text"
            name="contentDescription3"
            id="contentDescription3"
            value={formData.contentDescription3}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="w-24">
          <Label htmlFor="quantity3" className="font-semibold">
            Qty
          </Label>
          <Input
            type="number"
            name="quantity3"
            id="quantity3"
            min="1"
            value={formData.quantity3}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="w-36">
          <Label htmlFor="netWeight3" className="font-semibold">
            Net weight
          </Label>
          <Input
            type="text"
            name="netWeight3"
            id="netWeight3"
            value={formData.netWeight3}
            onChange={handleChange}
            placeholder="0.000 kg"
            className="w-full"
          />
        </div>
        <div className="w-36">
          <Label htmlFor="value3" className="font-semibold">
            Value
          </Label>
          <Input
            type="text"
            name="value3"
            id="value3"
            value={formData.value3}
            onChange={handleChange}
            placeholder="0.00 EUR"
            className="w-full"
          />
        </div>
        <div className="w-40">
          <Label htmlFor="HSTariffNumber3" className="font-semibold">
            HS tariff #
          </Label>
          <Input
            type="text"
            name="HSTariffNumber3"
            id="HSTariffNumber3"
            value={formData.HSTariffNumber3}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="w-44">
          <Label htmlFor="countryOfOriginOfGoods3" className="font-semibold">
            Country
          </Label>
          <Input
            type="text"
            name="countryOfOriginOfGoods3"
            id="countryOfOriginOfGoods3"
            value={formData.countryOfOriginOfGoods3}
            onChange={handleChange}
            autoComplete="off"
            className="w-full"
          />
        </div>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-end gap-2 mb-2">
        <div className="w-96">
          <Label htmlFor="contentDescription4" className="font-semibold">
            Description
          </Label>
          <Input
            type="text"
            name="contentDescription4"
            id="contentDescription4"
            value={formData.contentDescription4}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="w-24">
          <Label htmlFor="quantity4" className="font-semibold">
            Qty
          </Label>
          <Input
            type="number"
            name="quantity4"
            id="quantity4"
            min="1"
            value={formData.quantity4}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="w-36">
          <Label htmlFor="netWeight4" className="font-semibold">
            Net weight
          </Label>
          <Input
            type="text"
            name="netWeight4"
            id="netWeight4"
            value={formData.netWeight4}
            onChange={handleChange}
            placeholder="0.000 kg"
            className="w-full"
          />
        </div>
        <div className="w-36">
          <Label htmlFor="value4" className="font-semibold">
            Value
          </Label>
          <Input
            type="text"
            name="value4"
            id="value4"
            value={formData.value4}
            onChange={handleChange}
            placeholder="0.00 EUR"
            className="w-full"
          />
        </div>
        <div className="w-40">
          <Label htmlFor="HSTariffNumber4" className="font-semibold">
            HS tariff #
          </Label>
          <Input
            type="text"
            name="HSTariffNumber4"
            id="HSTariffNumber4"
            value={formData.HSTariffNumber4}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="w-44">
          <Label htmlFor="countryOfOriginOfGoods4" className="font-semibold">
            Country
          </Label>
          <Input
            type="text"
            name="countryOfOriginOfGoods4"
            id="countryOfOriginOfGoods4"
            value={formData.countryOfOriginOfGoods4}
            onChange={handleChange}
            autoComplete="off"
            className="w-full"
          />
        </div>
      </div>
      <hr className="border-neutral-200 dark:border-neutral-800 mb-4" />
      <div className="grid grid-cols-2 sm:grid-cols-4 items-end gap-4 mb-2">
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
            placeholder="0.000 kg"
            className="w-full"
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
            value={formData.totalValue}
            onChange={handleChange}
            placeholder="0.00 EUR"
            disabled
            className="w-full"
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
            autoComplete="off"
            placeholder="0.00 EUR"
            className="w-full"
          />
        </div>
        <div className="">
          <Label className="font-semibold">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                id="date"
                className={`justify-start text-left rounded-md w-full ${
                  !formData.date && " text-muted-foreground"
                }`}
              >
                <span>{formData.date || "Pick a date"}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                weekStartsOn={1}
                selected={
                  formData.date
                    ? new Date(formData.date.split("/").reverse().join("-"))
                    : undefined
                }
                onSelect={(date) =>
                  setFormData({
                    ...formData,
                    date: date ? format(date, "dd/MM/yyyy") : "",
                  })
                }
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
            onValueChange={(value) => {
              handleChange({
                target: {
                  name: "categoryOfItem",
                  value: value,
                },
              } as React.ChangeEvent<HTMLInputElement>);
              if (value === "other") {
                setTimeout(() => {
                  explainationRef.current?.focus();
                }, 15);
              }
            }}
          >
            <SelectTrigger
              className={`rounded-md w-full font-medium ${
                !formData.categoryOfItem && "text-muted-foreground"
              }`}
            >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="font-medium">
                <SelectItem value="gift">Gift</SelectItem>
                <SelectItem value="documents">Documents</SelectItem>
                <SelectItem value="commercial-sample">
                  Commercial sample
                </SelectItem>
                <SelectItem value="returned-goods">Returned goods</SelectItem>
                <SelectItem value="sale-of-goods">Sale of goods</SelectItem>
                <SelectItem value="other">Other (please specify)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          {formData.categoryOfItem === "other" && (
            <>
              <Label htmlFor="explaination" className="font-semibold">
                Explaination
              </Label>
              <Input
                type="text"
                name="explaination"
                id="explaination"
                ref={explainationRef}
                value={formData.explaination}
                onChange={handleChange}
                className="w-full"
              />
            </>
          )}
        </div>
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
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-2">
        <div className="flex items-center gap-2">
          <Checkbox
            name="licence"
            id="licence"
            checked={formData.licence}
            onCheckedChange={(checked) => {
              handleChange({
                target: {
                  name: "licence",
                  value: checked,
                  type: "checkbox",
                  checked: checked,
                },
              } as React.ChangeEvent<HTMLInputElement>);
              setTimeout(() => {
                licenceNumberRef.current?.focus();
              }, 0);
            }}
          />
          <Label htmlFor="licence">Licence</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            name="certificate"
            id="certificate"
            checked={formData.certificate}
            onCheckedChange={(checked) => {
              handleChange({
                target: {
                  name: "certificate",
                  value: checked,
                  type: "checkbox",
                  checked: checked,
                },
              } as React.ChangeEvent<HTMLInputElement>);
              setTimeout(() => {
                certificateNumberRef.current?.focus();
              }, 0);
            }}
          />
          <Label htmlFor="certificate">Certificate</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            name="invoice"
            id="invoice"
            checked={formData.invoice}
            onCheckedChange={(checked) => {
              handleChange({
                target: {
                  name: "invoice",
                  value: checked,
                  type: "checkbox",
                  checked: checked,
                },
              } as React.ChangeEvent<HTMLInputElement>);
              setTimeout(() => {
                invoiceNumberRef.current?.focus();
              }, 0);
            }}
          />
          <Label htmlFor="invoice">Invoice</Label>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          {formData.licence && (
            <>
              <Label htmlFor="licenceNumber" className="font-semibold">
                Licence number
              </Label>
              <Input
                type="text"
                name="licenceNumber"
                id="licenceNumber"
                ref={licenceNumberRef}
                value={formData.licenceNumber}
                onChange={handleChange}
                className="w-full"
              />
            </>
          )}
        </div>
        <div>
          {formData.certificate && (
            <>
              <Label htmlFor="certificateNumber" className="font-semibold">
                Certificate number
              </Label>
              <Input
                type="text"
                name="certificateNumber"
                id="certificateNumber"
                ref={certificateNumberRef}
                value={formData.certificateNumber}
                onChange={handleChange}
                className="w-full"
              />
            </>
          )}
        </div>
        <div>
          {formData.invoice && (
            <>
              <Label htmlFor="invoiceNumber" className="font-semibold">
                Invoice number
              </Label>
              <Input
                type="text"
                name="invoiceNumber"
                id="invoiceNumber"
                ref={invoiceNumberRef}
                value={formData.invoiceNumber}
                onChange={handleChange}
                className="w-full"
              />
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default Form;
