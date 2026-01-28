import React from "react";
import Image from "next/image";

const ProductBanner = ({ product }: { product: any }) => {
  return (
    <div>
      {product?.banner?.url ? (
        <Image
          src={product?.banner?.url}
          alt={product?.title}
          width={400}
          height={350}
          className="rounded-t-lg h-[250px] object-cover"
        />
      ) : (
        <div className="w-[400px] h-[225px] bg-gray-200 rounded-b-lg animate-pulse"></div>
      )}
    </div>
  );
};

export default ProductBanner;
