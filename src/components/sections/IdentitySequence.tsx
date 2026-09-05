"use client";

import React, { useRef } from "react";
import { motion, useTransform, useSpring, easeOut, easeInOut, circOut, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { portfolioData } from "@/data/portfolio";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";
import { BrandScroller, BrandScrollerReverse } from "@/components/ui/brand-scroller";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import MagneticEffect from "@/components/ui/MagneticEffect";
import { useIsMobile } from "@/hooks/use-mobile";

const BlurInUpText = ({ text, animate }: { text: string; animate: boolean }) => {
    const words = text.split(" ");
    return (
        <motion.span
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            transition={{ staggerChildren: 0.01 }}
            aria-label={text}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-pre">
                    {word.split("").map((char, charIndex) => (
                        <motion.span
                            key={charIndex}
                            variants={{
                                hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
                                visible: { 
                                    opacity: 1, 
                                    y: 0, 
                                    filter: "blur(0px)", 
                                    transition: { type: "spring", bounce: 0, duration: 0.5 } 
                                }
                            }}
                            className="inline-block"
                            style={{ willChange: "filter, opacity, transform" }}
                        >
                            {char}
                        </motion.span>
                    ))}
                    {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
                </span>
            ))}
        </motion.span>
    );
};

interface IdentitySequenceProps {
    scrollYProgress: any; // Parent scroll progress [0, 1]
    isVisible: boolean;
}

export const IdentitySequence = ({ scrollYProgress, isVisible }: IdentitySequenceProps) => {
    const t = useTranslations("about");
    const isMobileDevice = useIsMobile();
    const [isHovered, setIsHovered] = React.useState(false);
    const [isTextAnimated, setIsTextAnimated] = React.useState(false);

    // Map the parent's scroll progress (0.4 to 0.85) to local progress (0 to 1).
    // This leaves 0.85 to 1.0 (approx 90vh) as a "pause" where the user can just read the Tech Stack before it scrolls away.
    const localProgress = useTransform(scrollYProgress, [0.4, 0.85], [0, 1]);

    // 1. Card Transformation (Entrance & Scaling)
    const cardScale = useTransform(localProgress, [0, 0.4], [0.8, 1], { ease: easeInOut });
    const cardY = useTransform(localProgress, [0, 0.4], ["60vh", "0vh"], { ease: easeInOut });
    const cardBorderRadius = useTransform(localProgress, [0.1, 0.4], ["60px", "0px"], { ease: easeInOut });

    // 2. Internal Content Scroll
    const contentY = useTransform(localProgress, [0.35, 1], ["0%", "-70%"], { ease: easeInOut });

    // 3. Elements specific animations
    const phase0Opacity = useTransform(localProgress, [0, 0.15], [1, 0]);
    const cardContentOpacity = useTransform(localProgress, [0.1, 0.3], [0, 1]);
    const textOpacity = useTransform(localProgress, [0.85, 1], [0, 1]);

    useMotionValueEvent(localProgress, "change", (latest) => {
        if (latest > 0.85 && !isTextAnimated) {
            setIsTextAnimated(true);
        }
    });

    // 4. Background Color Transition (Smoothing the exit)
    const cardBg = useTransform(
        localProgress,
        [0.8, 1],
        ["#EBEBEB", "#FFFFFF"]
    );
    const cardBgDark = useTransform(
        localProgress,
        [0.8, 1],
        ["#18181b", "#000000"]
    );

    const { resolvedTheme } = useTheme();
    const cardBgValue = resolvedTheme === 'dark' ? cardBgDark : cardBg;

    const marqueeItems = [
        <span key="1" className="text-6xl sm:text-8xl md:text-[12rem] lg:text-[16rem] font-black uppercase tracking-tighter mx-4 sm:mx-8 md:mx-12 text-black dark:text-white leading-none">
            Data Analyst
        </span>,
        <div key="icon1" className="w-16 h-16 sm:w-28 sm:h-28 md:w-48 md:h-48 rounded-full bg-[#D1FF4D] flex items-center justify-center mx-4 sm:mx-8 md:mx-12">
            <svg viewBox="0 0 100 100" className="w-10 h-10 sm:w-16 sm:h-16 md:w-32 md:h-32 fill-black dark:fill-zinc-900">
                <path d="M50 0 C60 30 100 40 100 50 C100 60 60 70 50 100 C40 70 0 60 0 50 C0 40 40 30 50 0" />
            </svg>
        </div>,
        <span key="2" className="text-6xl sm:text-8xl md:text-[12rem] lg:text-[16rem] font-black uppercase tracking-tighter mx-4 sm:mx-8 md:mx-12 text-black dark:text-white leading-none">
            Frontend Developer
        </span>,
        <div key="icon2" className="w-16 h-16 sm:w-28 sm:h-28 md:w-48 md:h-48 rounded-full bg-[#D1FF4D] flex items-center justify-center mx-4 sm:mx-8 md:mx-12">
            <svg viewBox="0 0 100 100" className="w-10 h-10 sm:w-16 sm:h-16 md:w-32 md:h-32 fill-black dark:fill-zinc-900">
                <path d="M50 0 C60 30 100 40 100 50 C100 60 60 70 50 100 C40 70 0 60 0 50 C0 40 40 30 50 0" />
            </svg>
        </div>,
    ];

    return (
        <div className="relative w-screen h-full flex flex-col items-center justify-center overflow-hidden bg-background dark:bg-black">
            {/* Phase 0: The Lead-in UI (Visible before card scales) */}
            <motion.div
                style={{ opacity: phase0Opacity }}
                className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none -translate-y-12"
            >
                {/* Center Unified Action - Magnetic Group */}
                <div className="mb-16 pointer-events-auto">
                    <MagneticEffect>
                        <div className="group flex items-center gap-2 cursor-pointer">
                            <div className="relative px-6 py-3 sm:px-10 sm:py-5 rounded-full bg-black dark:bg-white group-hover:bg-[#c1e44a] dark:group-hover:bg-[#c1e44a] overflow-hidden transition-all duration-500 shadow-lg group-hover:shadow-[0_0_30px_rgba(193,228,74,0.3)]">
                                <div className="relative z-10 h-6 sm:h-7 overflow-hidden">
                                    <div className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1/2">
                                        <span className="text-white dark:text-black group-hover:text-black font-bold text-base sm:text-xl leading-6 sm:leading-7 transition-colors duration-500">
                                            {t("leadIn.aboutMe")}
                                        </span>
                                        <span className="text-black font-bold text-base sm:text-xl leading-6 sm:leading-7 transition-colors duration-500">
                                            {t("leadIn.aboutMe")}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black dark:bg-white group-hover:bg-[#c1e44a] dark:group-hover:bg-[#c1e44a] overflow-hidden flex items-center justify-center transition-all duration-500 shadow-lg">
                                <div className="relative z-10 h-6 sm:h-8 overflow-hidden">
                                    <div className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1/2">
                                        <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-white dark:text-black group-hover:text-black transition-colors duration-500" />
                                        <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-black transition-colors duration-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MagneticEffect>
                </div>

                {/* Unified Bottom Labels Layer */}
                <div className="w-full max-w-[1200px] flex items-center justify-between px-6 sm:px-12">
                    <div className="flex items-center gap-2 sm:gap-3 text-zinc-500 dark:text-white/60 text-xs sm:text-sm font-medium tracking-tight">
                        <motion.span
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-4 h-4 flex items-center justify-center"
                        >
                            ↓
                        </motion.span>
                        <span>{t("leadIn.scroll")}</span>
                    </div>

                    <div className="text-zinc-500 dark:text-white/60 text-xs sm:text-sm font-medium tracking-tight">
                        {t("leadIn.shortStory")}
                    </div>
                </div>
            </motion.div>

            {/* The Main Card Container */}
            <motion.div
                style={{
                    scale: cardScale,
                    y: cardY,
                    borderRadius: cardBorderRadius,
                    backgroundColor: cardBgValue,
                    willChange: "transform, background-color",
                }}
                className="relative w-full h-full flex flex-col overflow-hidden origin-bottom z-10"
            >
                {/* Unified Scrolling Content Wrapper */}
                <motion.div
                    style={{ y: contentY }}
                    className="relative w-full flex flex-col items-center"
                >
                    {/* Phase 1: Marquee Header (Top of the long card) */}
                    <div className="w-full h-screen flex items-center justify-center flex-shrink-0">
                        <motion.div style={{ opacity: cardContentOpacity }} className="w-full">
                            <InfiniteMarquee
                                items={marqueeItems}
                                speed={18}
                                className="w-full"
                                itemClassName="py-12"
                            />
                        </motion.div>
                    </div>

                    {/* Phase 2: The Large Portrait (The "Explore" area) */}
                    <div className="relative w-full h-[100vh] flex flex-col items-center justify-center flex-shrink-0 px-3 sm:px-6 md:px-10 lg:px-20 py-4 sm:py-6">
                        {/* Portrait Frame - perfectly sized to the 3:4 portrait shape, fully responsive across all screens */}
                        <div
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={() => setIsHovered(prev => !prev)}
                            style={{
                                width: "min(calc(82vh * 0.75), calc(100vw - 2.5rem), 660px)",
                                aspectRatio: "3 / 4",
                            }}
                            className="relative rounded-2xl md:rounded-3xl overflow-hidden group/photo cursor-pointer shadow-2xl ring-1 ring-black/10 dark:ring-white/15 bg-zinc-950 transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_25px_60px_rgba(209,255,77,0.12)] hover:scale-[1.01] active:scale-[0.99]"
                        >
                            {/* Image area: full uncropped portrait */}
                            <div className="relative w-full h-full overflow-hidden">
                                <motion.div
                                    animate={{
                                        filter: (isHovered || isMobileDevice) ? "grayscale(0%) contrast(1)" : "grayscale(100%) contrast(1.1)",
                                    }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="relative w-full h-full"
                                >
                                    <Image
                                        src={portfolioData.personal.avatar}
                                        alt={portfolioData.personal.name}
                                        fill
                                        className="object-contain grayscale-0"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 660px"
                                        priority
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Phase 3: Final Layout Text */}
                    <motion.div
                        style={{ opacity: textOpacity }}
                        className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 pt-12 pb-6 md:pt-32 md:pb-12 flex-shrink-0"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 md:gap-16 items-start">
                            {/* Header Left */}
                            <div className="md:col-span-7">
                                <h3
                                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-snug text-black dark:text-white"
                                    dangerouslySetInnerHTML={{ __html: t.raw("profile.title") }}
                                />
                            </div>

                            {/* Paragraph Right */}
                            <div className="md:col-span-5 pt-1">
                                <p className="text-[13px] md:text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                                    <BlurInUpText 
                                        text={`${t("profile.narrative")} ${t("profile.narrative2")}`} 
                                        animate={isTextAnimated} 
                                    />
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Phase 4: Tech Stack & Tools Scrollers */}
                    <motion.div
                        style={{ opacity: textOpacity }}
                        className="w-full max-w-[1700px] mx-auto py-12 md:py-20 flex flex-col gap-6 md:gap-8 flex-shrink-0"
                    >
                        <div className="px-4 sm:px-8 md:px-16 lg:px-24 mb-4 md:mb-6">
                            <h4 className="text-base sm:text-lg md:text-xl uppercase tracking-[0.15em] font-bold text-zinc-500 dark:text-zinc-400">
                                Tech Stack & Ecosystem
                            </h4>
                        </div>
                        <BrandScroller />
                        <BrandScrollerReverse />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};
