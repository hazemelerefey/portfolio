'use client';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePerformance } from '@/hooks/usePerformance';

const PdfViewer = dynamic(
    () => import('@/components/ui/pdf-viewer').then(mod => mod.PdfViewer),
    {
        ssr: false,
        loading: () => (
            <div className="flex flex-col items-center justify-center w-full h-full p-4">
                <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <p className="mt-4 text-muted-foreground text-sm font-medium">Loading Document...</p>
            </div>
        )
    }
);

export default function ResumePage() {
    const { isLowPowerMode } = usePerformance();
    const fileId = "1_ZJP1LHOCmgcHX7fx1MMMrjUubF1ftuV";
    const resumeUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;

    return (
        <div className="h-full bg-background relative flex flex-col pt-20 lg:pt-24 pb-3 md:pb-4 overflow-hidden">

            {/* Header / Controls */}
            <motion.div
                initial={isLowPowerMode ? { opacity: 0 } : { opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[1400px] mx-auto px-4 md:px-6 mb-3 sm:mb-4 flex-none flex flex-row justify-between items-center gap-4"
            >
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Portfolio</span>
                </Link>

                <div className="flex items-center gap-4">
                    <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-all active:scale-95 shadow-sm"
                    >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open in New Tab</span>
                    </a>
                </div>
            </motion.div>

            {/* Resume Viewer */}
            <motion.div
                initial={isLowPowerMode ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-6 min-h-0 pb-2 sm:pb-3 relative"
            >
                <div className="w-full h-full bg-muted/30 rounded-2xl border border-border/50 overflow-hidden relative group">
                    <PdfViewer url="/resume.pdf" />
                </div>
            </motion.div>
        </div>
    );
}
