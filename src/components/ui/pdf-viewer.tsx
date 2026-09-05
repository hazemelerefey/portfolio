"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  MinusCircle,
  PlusCircle,
  Loader2,
  RotateCcw,
  RotateCw,
  Search,
  Download,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs, Thumbnail } from "react-pdf";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// pdfjs worker - use cdnjs which is reliable and matches all versions
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const ZOOM_OPTIONS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4, 8];

function highlightPattern(text: string, pattern: string, itemIndex: number) {
  if (!pattern) return text;
  return text.replace(
    new RegExp(`(${pattern})`, "gi"),
    (value: string) => `<mark id="search-result-${itemIndex}">${value}</mark>`
  );
}

function Component({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const textRenderer = useCallback(
    (textItem: { str: string; itemIndex: number }) =>
      highlightPattern(textItem.str, searchQuery, textItem.itemIndex),
    [searchQuery]
  );

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    if (!viewportRef.current) return;

    const updatePageWidth = () => {
      if (!viewportRef.current) return;
      const isMobile = window.innerWidth < 640;
      const horizontalPadding = isMobile ? 24 : 64;
      const availableWidth = viewportRef.current.clientWidth - horizontalPadding;
      // Standard A4 / desktop PDF size is ~600px.
      // If available container width is smaller than 600px (mobile/tablet), scale down to fit available width.
      // On desktop and laptop, lock to standard 600px base width so it never blows up, cut off, or overflows!
      setPageWidth(Math.min(600, Math.max(200, availableWidth)));
    };

    updatePageWidth();
    const resizeObserver = new ResizeObserver(updatePageWidth);
    resizeObserver.observe(viewportRef.current);

    const options = {
      root: viewportRef.current,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const pageElement = entry.target.closest("[data-page-number]");
          if (pageElement) {
            const pageNumber = parseInt(
              pageElement.getAttribute("data-page-number") || "1",
              10
            );
            setCurrentPage(pageNumber);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    const mutationObserver = new MutationObserver(() => {
      const pages = viewportRef.current?.querySelectorAll(".react-pdf__Page");
      if (pages) {
        pages.forEach((page) => {
          observer.observe(page);
        });
      }
    });

    mutationObserver.observe(viewportRef.current, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [numPages]);

  return (
    <SidebarProvider>
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        className={"w-full flex flex-row h-full max-h-full overflow-hidden bg-background rounded-2xl border border-border"}
        loading={
          <div className="flex flex-col items-center justify-center w-full h-full p-4">
            <Loader2 className="size-8 text-primary animate-spin" />
            <p className="mt-4 text-muted-foreground text-sm font-medium">Loading Document...</p>
          </div>
        }
      >
        <Sidebar className="border-r border-border bg-background">
          <SidebarRail />
          <SidebarContent className="flex flex-col p-4 items-center">
            {Array.from(new Array(numPages || 0), (el, index) => (
              <div
                className={cn(
                  "flex flex-col gap-2 mb-4 w-40 hover:bg-muted/80 transition-colors p-3 rounded-xl cursor-pointer",
                  index + 1 === currentPage && "bg-muted shadow-sm border border-border/50"
                )}
                key={`thumbnail_${index + 1}`}
                onClick={() => {
                  const targetPage = viewportRef.current?.querySelector(`[data-page-number="${index + 1}"]`);
                  if (targetPage) {
                    targetPage.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Thumbnail
                  pageNumber={index + 1}
                  className="border border-border/50 shadow-sm rounded-md overflow-hidden bg-white"
                  width={140}
                  rotate={rotation}
                />
                <div className="flex flex-row justify-center">
                  <span className="text-xs font-semibold text-muted-foreground">Page {index + 1}</span>
                </div>
              </div>
            ))}
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col w-full flex-1 min-w-0 min-h-0 bg-muted/10 h-full overflow-hidden">
            <div className="flex p-3 border-b border-border bg-background/50 backdrop-blur-md justify-between items-center z-10 shrink-0 gap-2">
              <div className="flex flex-row gap-3 items-center shrink-0">
                <SidebarTrigger className="hover:bg-muted size-8" />
                <div className="text-sm font-medium text-foreground bg-muted px-3 py-1.5 rounded-md whitespace-nowrap">
                  {numPages ? `Page ${currentPage} of ${numPages}` : "Loading..."}
                </div>
              </div>
              <div className="flex flex-row gap-1 sm:gap-2 items-center shrink-0 overflow-x-auto no-scrollbar py-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full hover:bg-muted shrink-0"
                  onClick={() => setRotation(rotation - 90)}
                  title="Rotate Counter-Clockwise"
                >
                  <RotateCcw className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full hover:bg-muted shrink-0"
                  onClick={() => setRotation(rotation + 90)}
                  title="Rotate Clockwise"
                >
                  <RotateCw className="size-4" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full hover:bg-muted shrink-0"
                  disabled={zoom <= ZOOM_OPTIONS[0]}
                  onClick={() => setZoom(prev => Math.max(ZOOM_OPTIONS[0], Number((prev - 0.25).toFixed(2))))}
                  title="Zoom Out"
                >
                  <MinusCircle className="size-4" />
                </Button>

                <Select
                  value={zoom.toString()}
                  onValueChange={(value) => setZoom(Number(value))}
                >
                  <SelectTrigger className="h-8 rounded-md w-[92px] sm:w-[100px] border-border/50 bg-background focus:ring-1 focus:ring-primary shrink-0 text-xs">
                    <SelectValue placeholder="Zoom">
                      {`${Math.round(zoom * 100)}%`}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent align="center">
                    {ZOOM_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option.toString()}>
                        {`${Math.round(option * 100)}%`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full hover:bg-muted shrink-0"
                  disabled={zoom >= ZOOM_OPTIONS[ZOOM_OPTIONS.length - 1]}
                  onClick={() => setZoom(prev => Math.min(ZOOM_OPTIONS[ZOOM_OPTIONS.length - 1], Number((prev + 0.25).toFixed(2))))}
                  title="Zoom In"
                >
                  <PlusCircle className="size-4" />
                </Button>

                <Separator orientation="vertical" className="h-6" />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8 rounded-full hover:bg-muted shrink-0" title="Search document">
                      <Search className="size-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-3" align="end">
                    <div className="flex gap-2">
                      <Search className="size-4 text-muted-foreground absolute ml-2.5 mt-2.5" />
                      <Input
                        placeholder="Search document..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-9"
                      />
                    </div>
                  </PopoverContent>
                </Popover>

                <Separator orientation="vertical" className="h-6" />
                <a href={url} download title="Download Resume">
                  <Button variant="ghost" size="icon" className="size-8 rounded-full hover:bg-muted shrink-0">
                    <Download className="size-4" />
                  </Button>
                </a>
              </div>
            </div>

            <div 
              className="flex-1 w-full h-full min-h-0 overflow-auto no-scrollbar bg-zinc-100/50 dark:bg-zinc-950/90" 
              ref={viewportRef}
              data-lenis-prevent
            >
              <div className="items-center flex p-4 sm:p-6 md:p-8 flex-col min-h-max w-full">
                {Array.from(new Array(numPages || 0), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    className="mb-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-sm overflow-hidden"
                    data-page-number={index + 1}
                    renderAnnotationLayer={false}
                    renderTextLayer={true}
                    width={pageWidth ? pageWidth * zoom : undefined}
                    rotate={rotation}
                    loading={
                      <div 
                        style={{ width: pageWidth ? `${Math.min(pageWidth * zoom, 600)}px` : '100%' }}
                        className="max-w-[600px] aspect-[1/1.414] bg-white animate-pulse rounded-sm shadow-md"
                      />
                    }
                    customTextRenderer={textRenderer}
                  />
                ))}
              </div>
            </div>
          </div>
      </Document>
    </SidebarProvider>
  );
}

export { Component as PdfViewer };
