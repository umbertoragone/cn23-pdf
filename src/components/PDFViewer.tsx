import React, { useState, useEffect, useRef } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface PDFViewerProps {
  pdfUrl: string;
  invoiceNumber: string;
}

export default function PDFViewer({ pdfUrl, invoiceNumber }: PDFViewerProps) {
  const fileName = `cn23${invoiceNumber && `-${invoiceNumber}`}.pdf`;

  const [pageWidth, setPageWidth] = useState<number>(600);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updatePageWidth() {
      if (containerRef.current) {
        setPageWidth(containerRef.current.offsetWidth);
      }
    }
    updatePageWidth();
    window.addEventListener("resize", updatePageWidth);
    return () => window.removeEventListener("resize", updatePageWidth);
  }, []);

  return (
    <div ref={containerRef} className="w-full my-auto">
      <AspectRatio
        ratio={1.38}
        className="border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden"
      >
        <Document file={pdfUrl} loading={null}>
          <Page
            pageNumber={1}
            width={pageWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </AspectRatio>
      <div className="flex justify-center items-center gap-2 mt-4">
        <Button
          className={cn(
            "rounded-lg bg-green-700 hover:bg-green-800 font-semibold text-sm text-white shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          )}
          onClick={() => {
            if (pdfUrl) {
              const link = document.createElement("a");
              link.href = pdfUrl;
              link.download = fileName;
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
