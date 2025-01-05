import React from "react";
import { Button } from "@/components/ui/button";

interface PDFViewerProps {
  pdfUrl: string;
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  return (
    <div className="md:sticky md:top-1/2 md:transform md:-translate-y-1/2">
      <iframe
        src={pdfUrl}
        className="w-full h-[30vh] md:h-[25.6rem] border border-gray-300 rounded-lg m-auto"
      ></iframe>
      <div className="flex justify-center items-center gap-2 mt-4">
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
  );
}
