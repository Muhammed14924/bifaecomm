"use client";

import type { Review } from "@/components/smoothui/reviews-carousel";
import ReviewsCarousel from "@/components/smoothui/reviews-carousel";

export default function Slider({ sliderList }: { sliderList: Review[] }) {
  return (
    <div className="flex min-h-[700px] w-full items-center justify-center overflow-visible p-8">
      <div className="w-full max-w-7xl overflow-visible">
        <ReviewsCarousel height="650px" reviews={sliderList} />
      </div>
    </div>
  );
}
