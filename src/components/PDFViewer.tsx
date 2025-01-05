import React from "react";

interface PDFViewerProps {
  pdfUrl: string;
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  return (
    <iframe
      src={pdfUrl}
      className="sticky top-1/2 w-full h-full border border-gray-300 rounded-lg m-auto"
    ></iframe>
  );
}
