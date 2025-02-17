"use client";
import React, { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Document, Page, pdfjs } from "react-pdf";
import { useResizeDetector } from "react-resize-detector";
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
  const [debouncedPdfUrl, setDebouncedPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPdfUrl(pdfUrl);
    }, 300);

    return () => clearTimeout(handler);
  }, [pdfUrl]);

  const { width, ref } = useResizeDetector();

  return (
    <div ref={ref} className="w-full my-auto">
      <AspectRatio
        ratio={1.375}
        className="border border-neutral-200 dark:border-neutral-800 bg-white rounded-lg overflow-hidden"
      >
        {debouncedPdfUrl && (
          <Document
            file={debouncedPdfUrl}
            loading={
              <div
                className="flex justify-center items-center"
                style={{ height: Math.round((width ?? 600) / 1.375) }}
              >
                <Loader2 className="size-8 text-neutral-500 animate-spin" />
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
              width={width ? width : 600}
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
