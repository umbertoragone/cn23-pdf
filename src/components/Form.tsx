import React from "react";
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
  quantity1: number;
  netWeight1: string;
  value1: string;
  HSTariffNumber1: string;
  CountryOfOriginOfGoods1: string;
  contentDescription2: string;
  quantity2: number;
  netWeight2: string;
  value2: string;
  HSTariffNumber2: string;
  CountryOfOriginOfGoods2: string;
  contentDescription3: string;
  quantity3: number;
  netWeight3: string;
  value3: string;
  HSTariffNumber3: string;
  CountryOfOriginOfGoods3: string;
  contentDescription4: string;
  quantity4: number;
  netWeight4: string;
  value4: string;
  HSTariffNumber4: string;
  CountryOfOriginOfGoods4: string;
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
  // date: Date | null;
  // setDate: (date: Date | undefined) => void;
}

const Form: React.FC<FormProps> = ({
  formData,
  setFormData,
  // date,
  // setDate,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const totalValue =
    (
      (parseInt(formData.value1) || 0) * (Number(formData.quantity1) || 0) +
      (parseInt(formData.value2) || 0) * (Number(formData.quantity2) || 0) +
      (parseInt(formData.value3) || 0) * (Number(formData.quantity3) || 0) +
      (parseInt(formData.value4) || 0) * (Number(formData.quantity4) || 0)
    ).toString() + " EUR";
  return (
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
            <Label htmlFor="senderCustomsReference" className="font-semibold">
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
          <Label htmlFor="CountryOfOriginOfGoods1" className="font-semibold">
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
          <Label htmlFor="CountryOfOriginOfGoods2" className="font-semibold">
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
          <Label htmlFor="CountryOfOriginOfGoods3" className="font-semibold">
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
          <Label htmlFor="CountryOfOriginOfGoods4" className="font-semibold">
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
              <Button variant={"outline"} className={`justify-start text-left`}>
                <span>{formData.date || "Pick a date"}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.date ? new Date(formData.date) : undefined}
                onSelect={(date) =>
                  setFormData({
                    ...formData,
                    date: date ? format(date, "dd/MM/yyyy") : "",
                  })
                }
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
              handleChange({
                target: {
                  name: "categoryOfItem",
                  value: value,
                },
              } as React.ChangeEvent<HTMLInputElement>)
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
                <SelectItem value="returned-goods">Returned goods</SelectItem>
                <SelectItem value="sale-of-goods">Sale of goods</SelectItem>
                <SelectItem value="other">Other (please specify)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
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
                  value: checked,
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
                  value: checked,
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
                  value: checked,
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
            <>
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
                value={formData.certificateNumber}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full text-neutral-900"
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
                value={formData.invoiceNumber}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full text-neutral-900"
              />
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default Form;
