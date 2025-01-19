import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PDFViewerProps {
  pdfUrl: string;
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  return (
    <div className="p-4 rounded-lg md:sticky md:top-1/2 md:transform md:-translate-y-1/2">
      <iframe
        src={pdfUrl}
        className="w-full h-[30vh] md:h-[25.6rem] border border-gray-300 dark:border-gray-700 rounded-lg m-auto"
      ></iframe>
      <div className="flex justify-center items-center gap-2 mt-4">
        <Button
          className={cn(
            "rounded-lg bg-green-700 hover:bg-green-800 font-semibold text-sm text-white shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          )}
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
