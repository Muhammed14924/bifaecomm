"use client";
import { AlertOctagon, BadgeCheck, ShoppingCartIcon } from "lucide-react";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import SkeletonProductInfo from "./SkeletonProductInfo";
import addToCart from "@/app/_utils/CartApis";
const ProductInfo = ({ product }: { product: any }) => {
  const { user } = useUser();
  const router = useRouter();
  const path = usePathname();

  const handleAddToCart = () => {
    if (!user) {
      router.push(`/sign-in?redirect_url=${path}`);
      return;
    } else {
      const payload = {
        data: {
          username: user.fullName,
          email: user.emailAddresses[0].emailAddress,
          products: [product?.id],
        },
      };
      addToCart(payload);
      // router.push("/car");
    }
  };

  return (
    <div>
      {product?.id ? (
        <div>
          <h2 className="text-2xl font-bold">{product?.title}</h2>
          <h2 className="text-lg font-semibold">{product?.category}</h2>
          <h2 className="text-lg font-semibold">
            {product?.description[0]?.children[0]?.text}
          </h2>
          <h2 className="text-lg font-semibold text-gray-600 flex items-center gap-2">
            {product?.instantDelivery ? (
              <BadgeCheck className="w-5 h-5 text-green-500" />
            ) : (
              <AlertOctagon className="w-5 h-5 text-red-500" />
            )}
            eligible for instant delivery
          </h2>
          <h2 className="text-lg font-semibold text-green-600">
            {product?.price}
          </h2>
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <ShoppingCartIcon className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      ) : (
        <SkeletonProductInfo />
      )}
    </div>
  );
};

export default ProductInfo;
