"use client";
import React, { useState, useEffect, useRef } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useResizeDetector } from "react-resize-detector";
import Loading from "@/components/Loading";
import dynamic from "next/dynamic";

const Document = dynamic(
  () => import("react-pdf").then((mod) => mod.Document),
  { ssr: false },
);

const Page = dynamic(() => import("react-pdf").then((mod) => mod.Page), {
  ssr: false,
});

const configurePdfjs = async () => {
  const { pdfjs } = await import("react-pdf");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();
  return pdfjs;
};

interface PDFViewerProps {
  pdfUrl: string;
  invoiceNumber: string;
}

export default function PDFViewer({ pdfUrl, invoiceNumber }: PDFViewerProps) {
  const fileName = `cn23${invoiceNumber && `-${invoiceNumber}`}.pdf`;
  const [debouncedPdfUrl, setDebouncedPdfUrl] = useState<string>(pdfUrl);
  const [mounted, setMounted] = useState(false);
  const [pdfjsReady, setPdfjsReady] = useState(false);
  const prevPdfUrl = useRef(pdfUrl);

  useEffect(() => {
    setMounted(true);
    configurePdfjs().then(() => setPdfjsReady(true));
  }, []);

  useEffect(() => {
    if (prevPdfUrl.current === pdfUrl) return;
    const handler = setTimeout(() => {
      setDebouncedPdfUrl(pdfUrl);
      prevPdfUrl.current = pdfUrl;
    }, 300);
    return () => clearTimeout(handler);
  }, [pdfUrl]);

  const { width, ref } = useResizeDetector();

  if (!mounted || !pdfjsReady) {
    return (
      <div ref={ref} className="w-full my-auto">
        <AspectRatio
          ratio={1.375}
          className="border border-neutral-200 dark:border-neutral-800 bg-white rounded-lg overflow-hidden"
        >
          <Loading width={width} />
        </AspectRatio>
      </div>
    );
  }

  return (
    <div ref={ref} className="w-full my-auto">
      <AspectRatio
        ratio={1.375}
        className="border border-neutral-200 dark:border-neutral-800 bg-white rounded-lg overflow-hidden text-black"
      >
        <Document
          file={debouncedPdfUrl}
          loading={<Loading width={width} />}
          noData={null}
          onLoadError={(error) => {
            console.error("PDF Load Error:", error);
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
              console.error("PDF Page Load Error:", error);
              toast.error("PDF Page Load Error", {
                description: error.message,
              });
            }}
          />
        </Document>
      </AspectRatio>
      <div className="flex justify-center items-center gap-2 mt-4">
        <Button
          className={cn(
            "rounded-lg bg-green-700 hover:bg-green-800 font-semibold text-sm text-white shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75",
          )}
          onClick={() => {
            if (debouncedPdfUrl) {
              const link = document.createElement("a");
              link.href = debouncedPdfUrl;
              link.download = fileName;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }}
        >
          Download
        </Button>
      </div>
    </div>
  );
}
