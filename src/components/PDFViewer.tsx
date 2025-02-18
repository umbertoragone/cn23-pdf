"use client";
import React, { useState, useEffect, useRef } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Document, Page, pdfjs } from "react-pdf";
import { Loader2 } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PDFViewerProps {
  pdfUrl: string;
  invoiceNumber: string;
}

export default function PDFViewer({ pdfUrl, invoiceNumber }: PDFViewerProps) {
  const fileName = `cn23${invoiceNumber && `-${invoiceNumber}`}.pdf`;

  const [pageWidth, setPageWidth] = useState<number>(600);
  const containerRef = useRef<HTMLDivElement>(null);
  const [debouncedPdfUrl, setDebouncedPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPdfUrl(pdfUrl);
    }, 300);

    return () => clearTimeout(handler);
  }, [pdfUrl]);

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
        ratio={1.375}
        className="border border-neutral-200 dark:border-neutral-800 bg-white rounded-lg overflow-hidden"
      >
        {debouncedPdfUrl && (
          <Document
            file={debouncedPdfUrl}
            loading={
              <div className="flex justify-center">
                <Loader2 className="text-neutral-500 size-8 animate-spin my-44" />
              </div>
            }
            onLoadError={(error) => {
              toast.error("PDF Load Error", {
                description: error.message,
              });
            }}
          >
            <Page
              pageNumber={1}
              width={pageWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              loading={null}
              onLoadError={(error) => {
                toast.error("PDF Page Load Error", {
                  description: error.message,
                });
              }}
            />
          </Document>
        )}
      </AspectRatio>
      <div className="flex justify-center items-center gap-2 mt-4">
        <Button
          className={cn(
            "rounded-lg bg-green-700 hover:bg-green-800 font-semibold text-sm text-white shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          )}
          onClick={() => {
            if (debouncedPdfUrl) {
              const link = document.createElement("a");
              link.href = debouncedPdfUrl;
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
