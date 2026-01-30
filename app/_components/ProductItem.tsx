import Image from "next/image";
import { List } from "lucide-react";
import Link from "next/link";
const ProductItem = ({ product }: { product: any }) => {
  return (
    <Link
      href={`/product-details/${product?.id}`}
      className="rounded-lg border-teal-400 border-2 overflow-hidden hover:cursor-pointer hover:border hover:shadow-md hover:scale-105 ease-in-out duration-500"
    >
      <Image
        src={product?.banner?.[0]?.url}
        alt={product?.title}
        width={400}
        height={350}
        className="rounded-t-lg h-[250px] object-cover"
      />
      <div className="flex justify-between p-4 items-center rounded-b-lg bg-gray-50">
        <div className="">
          <h2 className="text-lg font-semibold line-clamp-1">
            {product?.title}
          </h2>
          <h2 className="text-[12px] font-bold text-gray-500 flex items-center gap-2">
            <List className="w-4 h-4" /> {product?.category}
          </h2>
        </div>
        <h2 className="text-lg font-semibold">{product?.price}</h2>
      </div>
      {/* <p className="text-sm text-gray-500">
        {typeof product?.description === "string"
          ? product?.description
          : typeof product?.description === "object"
          ? product?.description?.[0]?.children?.[0]?.text ||
            "Rich Text Content"
          : null}
      </p>
      <p className="font-bold">{product?.price}</p> */}
    </Link>
  );
};

export default ProductItem;
