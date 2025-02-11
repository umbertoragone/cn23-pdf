import { PDFDocument, StandardFonts } from "pdf-lib";

export const updatePdf = async (
  pdfUrl: string,
  formData: {
    senderName?: string;
    senderBusiness?: string;
    senderStreet?: string;
    senderPostcode?: string;
    senderCity?: string;
    senderCountry?: string;
    senderCustomsReference?: string;
    recipientName?: string;
    recipientBusiness?: string;
    recipientStreet?: string;
    recipientPostcode?: string;
    recipientCity?: string;
    recipientCountry?: string;
    recipientEmail?: string;
    contentDescription1?: string;
    quantity1?: string;
    netWeight1?: string;
    value1?: string;
    HSTariffNumber1?: string;
    countryOfOriginOfGoods1?: string;
    contentDescription2?: string;
    quantity2?: string;
    netWeight2?: string;
    value2?: string;
    HSTariffNumber2?: string;
    countryOfOriginOfGoods2?: string;
    contentDescription3?: string;
    quantity3?: string;
    netWeight3?: string;
    value3?: string;
    HSTariffNumber3?: string;
    countryOfOriginOfGoods3?: string;
    contentDescription4?: string;
    quantity4?: string;
    netWeight4?: string;
    value4?: string;
    HSTariffNumber4?: string;
    countryOfOriginOfGoods4?: string;
    totalWeight?: string;
    totalValue?: string;
    postalCharges?: string;
    categoryOfItem?: string;
    explaination?: string;
    comments?: string;
    licence?: boolean;
    licenceNumber?: string;
    certificate?: boolean;
    certificateNumber?: string;
    invoice?: boolean;
    invoiceNumber?: string;
    date?: string;
  },
  setPdfUrl: (url: string) => void
) => {
  try {
    if (!pdfUrl) {
      console.error("PDF URL is not set.");
      return;
    }

    const originalPdfBytes = await fetch("/assets/docs/cn23.pdf").then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(originalPdfBytes);
    const page = pdfDoc.getPages()[0];

    const courierFont = await pdfDoc.embedFont(StandardFonts.Courier);
    const helveticaBoldFont = await pdfDoc.embedFont(
      StandardFonts.HelveticaBold
    );
    page.setFont(helveticaBoldFont);

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
      countryOfOriginOfGoods1,
      contentDescription2,
      quantity2,
      netWeight2,
      value2,
      HSTariffNumber2,
      countryOfOriginOfGoods2,
      contentDescription3,
      quantity3,
      netWeight3,
      value3,
      HSTariffNumber3,
      countryOfOriginOfGoods3,
      contentDescription4,
      quantity4,
      netWeight4,
      value4,
      HSTariffNumber4,
      countryOfOriginOfGoods4,
      totalWeight,
      totalValue,
      postalCharges,
      categoryOfItem,
      explaination,
      comments,
      licence,
      licenceNumber,
      certificate,
      certificateNumber,
      invoice,
      invoiceNumber,
      date,
    } = formData;

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
        size: Math.min(
          10,
          (9.4 * 100) /
            helveticaBoldFont.widthOfTextAtSize(senderCity.toUpperCase(), 10)
        ),
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
        size: Math.min(
          10,
          (6.1 * 100) /
            helveticaBoldFont.widthOfTextAtSize(
              senderCustomsReference.toUpperCase(),
              10
            )
        ),
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
        size: Math.min(
          10,
          (9.4 * 100) /
            helveticaBoldFont.widthOfTextAtSize(recipientCity.toUpperCase(), 10)
        ),
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
        x: quantity1.length == 1 ? 246 : 243,
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
        x: value1.length == 9 ? 328.5 : 331,
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

    if (countryOfOriginOfGoods1) {
      page.drawText(countryOfOriginOfGoods1.toUpperCase(), {
        x: 499,
        y: pageHeight - 243,
        size: Math.min(
          10,
          (11.3 * 100) /
            helveticaBoldFont.widthOfTextAtSize(
              countryOfOriginOfGoods1.toUpperCase(),
              10
            )
        ),
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
        x: quantity2.length == 1 ? 246 : 243,
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
        x: value2.length == 9 ? 328.5 : 331,
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

    if (countryOfOriginOfGoods2) {
      page.drawText(countryOfOriginOfGoods2.toUpperCase(), {
        x: 499,
        y: pageHeight - 258,
        size: Math.min(
          10,
          (11.3 * 100) /
            helveticaBoldFont.widthOfTextAtSize(
              countryOfOriginOfGoods2.toUpperCase(),
              10
            )
        ),
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
        x: quantity3.length == 1 ? 246 : 243,
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
        x: value3.length == 9 ? 328.5 : 331,
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

    if (countryOfOriginOfGoods3) {
      page.drawText(countryOfOriginOfGoods3.toUpperCase(), {
        x: 499,
        y: pageHeight - 272.5,
        size: Math.min(
          10,
          (11.3 * 100) /
            helveticaBoldFont.widthOfTextAtSize(
              countryOfOriginOfGoods3.toUpperCase(),
              10
            )
        ),
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
        x: quantity4.length == 1 ? 246 : 243,
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
        x: value4.length == 9 ? 328.5 : 331,
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

    if (countryOfOriginOfGoods4) {
      page.drawText(countryOfOriginOfGoods4.toUpperCase(), {
        x: 499,
        y: pageHeight - 287,
        size: Math.min(
          10,
          (11.3 * 100) /
            helveticaBoldFont.widthOfTextAtSize(
              countryOfOriginOfGoods4.toUpperCase(),
              10
            )
        ),
      });
    }

    if (totalWeight) {
      page.drawText(totalWeight, {
        x: 278,
        y: pageHeight - 307,
        size: 7,
      });
    }

    if (totalValue && totalValue !== "0.00") {
      page.drawText(totalValue, {
        x: 330,
        y: pageHeight - 307,
        size: 7,
      });
    }

    switch (categoryOfItem) {
      case "gift":
        page.drawText("x", {
          x: 74.4,
          y: pageHeight - 332.7,
          size: 14.1,
        });
        break;
      case "documents":
        page.drawText("x", {
          x: 74.4,
          y: pageHeight - 342.7,
          size: 14.1,
        });
        break;
      case "commercial-sample":
        page.drawText("x", {
          x: 166.6,
          y: pageHeight - 322.7,
          size: 14.1,
        });
        break;
      case "returned-goods":
        page.drawText("x", {
          x: 166.6,
          y: pageHeight - 332.7,
          size: 14.1,
        });
        break;
      case "sale-of-goods":
        page.drawText("x", {
          x: 166.6,
          y: pageHeight - 342.7,
          size: 14.1,
        });
        break;
      case "other":
        page.drawText("x", {
          x: 284.6,
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
        x: 74.3,
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
        x: 180,
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
        x: 282.3,
        y: pageHeight - 409.5,
        size: 14.1,
      });
      if (invoiceNumber) {
        page.drawText(invoiceNumber, {
          x: 282,
          y: pageHeight - 429,
          size: 10,
        });
      }
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

    page.drawText("https://cn23.it", {
      x: 72,
      y: pageHeight - 442.8,
      font: courierFont,
      size: 7,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const pdfUrlObject = URL.createObjectURL(blob);
    setPdfUrl(pdfUrlObject);
  } catch (error) {
    console.error("Error updating PDF:", error);
  }
};
