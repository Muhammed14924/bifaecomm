"use client";

/**
 * @author: @nuelst
 * @description: Card Flip - Category Theme (Modified for Bifa)
 * @version: 1.2.0
 * @date: 2025-01-14
 * @license: MIT
 * @website: https://nueslt.vercel.app
 * @github: https://github.com/nuelst
 */

import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Grid3X3,
  Package,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface CardFlipProps {
  /** Category name */
  name: string;
  /** Category image URL */
  imageUrl?: string;
  /** Link to category page */
  href?: string;
  /** Optional description */
  description?: string;
  /** Optional features/tags */
  features?: string[];
}

export default function CardFlip({
  name = "التصنيف",
  imageUrl,
  href = "#",
  description = "تصفح منتجات هذا التصنيف واكتشف أفضل العروض",
  features = ["جودة عالية", "أسعار مناسبة", "توصيل سريع", "منتجات متنوعة"],
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const CardWrapper = href ? Link : "div";

  return (
    <CardWrapper
      href={href}
      className="group relative h-[280px] w-full max-w-[220px] [perspective:2000px] block"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          "relative h-full w-full",
          "[transform-style:preserve-3d]",
          "transition-all duration-700",
          isFlipped
            ? "[transform:rotateY(180deg)]"
            : "[transform:rotateY(0deg)]",
        )}
      >
        {/* Front of card */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[transform:rotateY(0deg)] backface-hidden",
            "overflow-hidden rounded-2xl",
            "bg-linear-to-br from-red-50 via-red-100 to-red-50",
            "dark:from-zinc-900 dark:via-zinc-900/95 dark:to-zinc-800",
            "border border-red-200 dark:border-zinc-800/50",
            "shadow-lg dark:shadow-xl",
            "transition-all duration-700",
            "group-hover:shadow-xl group-hover:shadow-red-200/50 dark:group-hover:shadow-2xl",
            "group-hover:border-[#8a1818] dark:group-hover:border-[#8a1818]/30",
            isFlipped ? "opacity-0" : "opacity-100",
          )}
        >
          {/* Background gradient effect */}
          <div className="from-[#8a1818]/5 dark:from-[#8a1818]/10 absolute inset-0 bg-gradient-to-br via-transparent to-[#8a1818]/5 dark:to-[#8a1818]/10" />

          {/* Animated shimmer blocks */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex h-[140px] w-full flex-col items-center justify-center gap-2">
              {/* Shimmer animation */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-2 rounded-full",
                    "from-red-300/20 via-red-400/30 to-red-300/20 bg-gradient-to-r",
                    "animate-[slideIn_2s_ease-in-out_infinite]",
                    "opacity-0",
                  )}
                  style={{
                    width: `${40 + ((i * 7) % 30)}%`,
                    animationDelay: `${i * 0.3}s`,
                    marginLeft: `${(i * 3) % 15}%`,
                  }}
                />
              ))}

              {/* Category Image or Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                {imageUrl ? (
                  <div className="relative w-[100px] h-[100px] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Image
                      src={imageUrl}
                      alt={name}
                      fill
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                ) : (
                  <div
                    className={cn(
                      "h-16 w-16 rounded-xl",
                      "from-[#8a1818] via-[#6d1313] to-[#8a1818] bg-gradient-to-br",
                      "flex items-center justify-center",
                      "shadow-[#8a1818]/25 shadow-lg",
                      "animate-pulse",
                      "transition-all duration-500 group-hover:scale-110 group-hover:rotate-12",
                    )}
                  >
                    <Package className="h-8 w-8 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom content */}
          <div className="absolute right-0 bottom-0 left-0 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1 flex-1 text-center">
                <h3 className="text-base leading-snug font-bold tracking-tight text-[#8a1818] transition-all duration-500 ease-out group-hover:translate-y-[-4px] dark:text-red-400">
                  {name}
                </h3>
              </div>
              <div className="group/icon relative">
                <div
                  className={cn(
                    "absolute inset-[-8px] rounded-lg transition-opacity duration-300",
                    "from-[#8a1818]/20 via-[#8a1818]/10 bg-gradient-to-br to-transparent",
                    "opacity-0 group-hover/icon:opacity-100",
                  )}
                />
                <Sparkles className="text-[#8a1818] relative z-10 h-5 w-5 transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:rotate-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[transform:rotateY(180deg)] backface-hidden",
            "rounded-2xl p-4",
            "bg-linear-to-br from-[#8a1818] via-[#6d1313] to-[#8a1818]",
            "dark:from-[#6d1313] dark:via-[#5a0f0f] dark:to-[#6d1313]",
            "border border-[#8a1818] dark:border-[#8a1818]",
            "shadow-lg shadow-red-300/30 dark:shadow-xl",
            "flex flex-col",
            "transition-all duration-700",
            "group-hover:shadow-xl group-hover:shadow-[#8a1818]/40 dark:group-hover:shadow-2xl",
            !isFlipped ? "opacity-0" : "opacity-100",
          )}
        >
          {/* Background gradient */}
          <div className="from-white/10 absolute inset-0 rounded-2xl bg-gradient-to-br via-transparent to-[#8a1818]/20" />

          <div className="relative z-10 flex-1 space-y-3">
            <div className="space-y-2">
              <div className="mb-2 flex items-center gap-2">
                <div className="from-white/30 via-white/20 to-white/10 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br backdrop-blur-sm">
                  <Grid3X3 className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-base leading-snug font-bold tracking-tight text-white transition-all duration-500 ease-out group-hover:translate-y-[-2px]">
                  {name}
                </h3>
              </div>
              <p className="line-clamp-2 text-xs tracking-tight text-white/80 transition-all duration-500 ease-out group-hover:translate-y-[-2px]">
                {description}
              </p>
            </div>

            <div className="space-y-1.5">
              {features.slice(0, 3).map((feature, index) => {
                const icons = [ShoppingBag, Package, Sparkles, Grid3X3];
                const IconComponent = icons[index % icons.length];

                return (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-xs text-white/90 transition-all duration-500"
                    style={{
                      transform: isFlipped
                        ? "translateX(0)"
                        : "translateX(-10px)",
                      opacity: isFlipped ? 1 : 0,
                      transitionDelay: `${index * 100 + 200}ms`,
                    }}
                  >
                    <div className="bg-white/20 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded">
                      <IconComponent className="text-white h-2.5 w-2.5" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mt-auto border-t border-white/20 pt-3">
            <div
              className={cn(
                "group/start relative",
                "flex items-center justify-between",
                "rounded-lg p-2",
                "transition-all duration-300",
                "bg-linear-to-r from-white/10 via-white/10 to-white/5",
                "hover:from-white/20 hover:via-white/15 hover:to-white/10",
                "hover:scale-[1.02] hover:cursor-pointer",
                "border border-white/10 hover:border-white/30",
              )}
            >
              <span className="group-hover/start:text-white text-xs font-semibold text-white/90 transition-colors duration-300">
                تصفح المنتجات
              </span>
              <div className="group/icon relative">
                <div
                  className={cn(
                    "absolute inset-[-6px] rounded-lg transition-all duration-300",
                    "from-white/20 via-white/10 bg-gradient-to-br to-transparent",
                    "scale-90 opacity-0 group-hover/start:scale-100 group-hover/start:opacity-100",
                  )}
                />
                <ArrowRight className="text-white relative z-10 h-4 w-4 transition-all duration-300 group-hover/start:translate-x-1 group-hover/start:scale-110" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          50% {
            transform: translateX(0);
            opacity: 0.8;
          }
          100% {
            transform: translateX(100px);
            opacity: 0;
          }
        }
      `}</style>
    </CardWrapper>
  );
}
