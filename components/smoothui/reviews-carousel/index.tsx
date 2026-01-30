"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const FRAME_OFFSET = -30;
const FRAMES_VISIBLE_LENGTH = 3;

function clamp(val: number, [min, max]: [number, number]): number {
  return Math.min(Math.max(val, min), max);
}

export type Review = {
  id: string | number;
  attributes?: {
    body?: string;
    author?: string;
    title?: string;
    name?: string;
    image?: {
      data?:
        | {
            attributes?: {
              url: string;
            };
          }
        | {
            attributes?: {
              url: string;
            };
          }[];
    };
  };
  body?: string;
  author?: string;
  title?: string;
  name?: string;
  image?: { url: string; alternativeText?: string | null }[];
};

type ReviewCardProps = {
  review: Review;
  index: number;
  activeIndex: number;
  totalCards: number;
};

function ReviewCard({
  review,
  index,
  activeIndex,
  totalCards,
}: ReviewCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const offsetIndex = index - activeIndex;

  // Same logic as time-machine
  const blur = activeIndex > index ? 2 : 0;
  const opacity = activeIndex > index ? 0 : 1;
  const scale = shouldReduceMotion
    ? 1
    : clamp(1 - offsetIndex * 0.08, [0.08, 2]);
  const y = shouldReduceMotion
    ? 0
    : clamp(offsetIndex * FRAME_OFFSET, [
        FRAME_OFFSET * FRAMES_VISIBLE_LENGTH,
        Number.POSITIVE_INFINITY,
      ]);

  const isActive = index === activeIndex;

  // Helper to extract data from Strapi or flat objects
  const data = review.attributes || review;

  // Extract images
  let images: { url: string; alt?: string }[] = [];
  if (review.image && Array.isArray(review.image)) {
    images = review.image.map((img) => ({
      url: img.url || "",
      alt: img.alternativeText || "",
    }));
  } else if (data.image) {
    const imageData: any = data.image; // Using any here as Strapi types are complex, but keeping it scoped
    if (Array.isArray(imageData)) {
      images = imageData.map((img) => ({
        url: img.url || "",
        alt: img.alternativeText || "",
      }));
    } else if (imageData.data) {
      const d = imageData.data;
      if (Array.isArray(d)) {
        images = d.map((item: any) => ({
          url: item.attributes?.url || item.url || "",
          alt: item.attributes?.alternativeText || "",
        }));
      } else {
        images = [
          {
            url: d.attributes?.url || d.url || "",
            alt: d.attributes?.alternativeText || "",
          },
        ];
      }
    }
  }

  const name = data.name || data.title || "";
  const body = data.body || "";

  return (
    <motion.figure
      animate={{
        y,
        scale,
        transition: {
          type: "spring",
          stiffness: 250,
          damping: 20,
          mass: 0.5,
          duration: 0.25,
        },
      }}
      className={cn(
        "-translate-x-1/2 -translate-y-1/2 absolute left-1/2 w-[calc(100%-2rem)] max-w-[800px] h-[400px] overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur-xl",
      )}
      initial={false}
      style={{
        borderWidth: 1 / scale,
        willChange: "opacity, filter, transform",
        filter: `blur(${blur}px)`,
        opacity,
        transitionProperty: "opacity, filter",
        transitionDuration: shouldReduceMotion ? "0ms" : "250ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: totalCards - index,
        pointerEvents: isActive ? "auto" : "none",
        top: "50%",
      }}
    >
      {images.length > 0 ? (
        <div className="relative h-full w-full group">
          <Image
            src={images[0].url}
            alt={images[0].alt || name || "Slide image"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={isActive}
          />
          {/* Subtle overlay for text readability if needed */}
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-6 sm:p-10">
            {name && (
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={isActive ? { y: 0, opacity: 1 } : {}}
                className="text-2xl sm:text-4xl font-bold text-white mb-2"
              >
                {name}
              </motion.h3>
            )}
            {body && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={isActive ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.1 }}
                className="text-white/80 text-sm sm:text-base max-w-xl line-clamp-2"
              >
                {body}
              </motion.p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col justify-center p-6 sm:p-10">
          <blockquote className="relative">
            <div className="-left-4 -top-4 absolute text-8xl text-foreground/5 leading-none">
              &quot;
            </div>
            <p className="relative text-lg sm:text-2xl font-medium text-foreground/90 leading-relaxed italic">
              {body}
            </p>
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-sm uppercase tracking-wider">
                {data.author || "Anónimo"}
              </span>
              <span className="text-foreground/50 text-xs italic">
                {data.title}
              </span>
            </div>
          </figcaption>
        </div>
      )}
    </motion.figure>
  );
}

type NavigationButtonProps = {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
};

function NavigationButton({
  direction,
  onClick,
  disabled,
}: NavigationButtonProps) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      aria-label={direction === "prev" ? "Anterior" : "Siguiente"}
      className={cn(
        "box-gen group relative z-0 flex h-7 w-7 items-center justify-center rounded-full border-[0.5px] border-foreground/10 bg-background/50 backdrop-blur-sm transition-all duration-200",
        disabled
          ? "cursor-not-allowed opacity-30"
          : "cursor-pointer hover:border-foreground/20 hover:bg-background/70 hover:shadow-lg",
        "dark:border-foreground/5 dark:bg-foreground/5 dark:hover:border-foreground/10 dark:hover:bg-foreground/10",
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <Icon
        className={cn(
          "h-3.5 w-3.5 text-foreground/60 transition-colors",
          "group-hover:text-foreground group-disabled:text-foreground/20",
        )}
      />
    </button>
  );
}

export type ReviewsCarouselProps = {
  reviews: Review[];
  className?: string;
  height?: string;
  excludeIds?: (string | number)[];
  showIndicators?: boolean;
  showNavigation?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
};

export default function ReviewsCarousel({
  reviews,
  className = "",
  height = "300px",
  excludeIds = [],
  showIndicators = true,
  showNavigation = true,
  autoPlay = true,
  autoPlayInterval = 6000,
}: ReviewsCarouselProps) {
  // Filter out excluded reviews - use Set for O(1) lookups
  const filteredReviews = useMemo(() => {
    if (excludeIds.length === 0) return reviews;

    const excludeSet = new Set(excludeIds);
    const reviewsLength = reviews.length;
    const results: typeof reviews = [];

    // Use for loop for better performance
    for (let i = 0; i < reviewsLength; i++) {
      const review = reviews[i];
      if (!excludeSet.has(review.id)) {
        results.push(review);
      }
    }

    return results;
  }, [reviews, excludeIds]);

  const maxIndex = filteredReviews.length - 1;
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || maxIndex < 0) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        if (prevIndex >= maxIndex) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, autoPlayInterval);

    return () => {
      clearInterval(interval);
    };
  }, [autoPlay, autoPlayInterval, maxIndex]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        setActiveIndex((i) => clamp(i - 1, [0, maxIndex]));
      } else if (event.key === "ArrowRight") {
        setActiveIndex((i) => clamp(i + 1, [0, maxIndex]));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [maxIndex]);

  const goToPrevious = () => {
    setActiveIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex <= maxIndex ? newIndex : prevIndex;
    });
  };

  if (filteredReviews.length === 0) {
    return null;
  }

  return (
    <div
      className={cn("relative mx-auto w-full", className)}
      style={{ height }}
    >
      {/* Stack of cards - using grid-stack pattern */}
      <div className="relative h-full w-full py-8">
        <div className="grid h-full w-full place-items-center">
          {filteredReviews.map((review: Review, index: number) => (
            <ReviewCard
              activeIndex={activeIndex}
              index={index}
              key={review.id}
              review={review}
              totalCards={filteredReviews.length}
            />
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      {(showNavigation || showIndicators) && (
        <div className="-translate-x-1/2 absolute bottom-4 left-1/2 z-50 flex items-center gap-2">
          {showNavigation && (
            <NavigationButton
              direction="prev"
              disabled={activeIndex <= 0}
              onClick={goToPrevious}
            />
          )}
          {showIndicators && (
            <div className="flex items-center gap-2">
              {filteredReviews.map((review: Review, index: number) => (
                <button
                  aria-label={`Ir al testimonio ${index + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-200",
                    index === activeIndex
                      ? "w-8 bg-[#8a1818]"
                      : "w-2 bg-[#8a1818]/30 hover:bg-[#8a1818]/50",
                  )}
                  key={review.id}
                  onClick={() => {
                    setActiveIndex(index);
                  }}
                  type="button"
                />
              ))}
            </div>
          )}
          {showNavigation && (
            <NavigationButton
              direction="next"
              disabled={activeIndex === maxIndex}
              onClick={goToNext}
            />
          )}
        </div>
      )}
    </div>
  );
}
