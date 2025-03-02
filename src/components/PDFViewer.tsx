"use client";
import React, { useState, useEffect, Suspense, useRef } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Document, Page, pdfjs } from "react-pdf";
import { useResizeDetector } from "react-resize-detector";
import Loading from "@/components/Loading";

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
  const [debouncedPdfUrl, setDebouncedPdfUrl] = useState<string>(pdfUrl);
  const prevPdfUrl = useRef(pdfUrl);

  useEffect(() => {
    if (prevPdfUrl.current === pdfUrl) return;
    const handler = setTimeout(() => {
      setDebouncedPdfUrl(pdfUrl);
      prevPdfUrl.current = pdfUrl;
    }, 300);
    return () => clearTimeout(handler);
  }, [pdfUrl]);

  const { width, ref } = useResizeDetector();

  return (
    <div ref={ref} className="w-full my-auto">
      <AspectRatio
        ratio={1.375}
        className="border border-neutral-200 dark:border-neutral-800 bg-white rounded-lg overflow-hidden text-black"
      >
        <Suspense fallback={<Loading width={width} />}>
          <Document
            file={debouncedPdfUrl}
            loading={null}
            noData={null}
            onLoadError={(error) => {
              toast.error("PDF Load Error", {
                description: error.message,
              });
            }}
          >
            <Page
              pageNumber={1}
              width={width}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              loading={<Loading width={width} />}
              onLoadError={(error) => {
                toast.error("PDF Page Load Error", {
                  description: error.message,
                });
              }}
            />
          </Document>
        </Suspense>
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
