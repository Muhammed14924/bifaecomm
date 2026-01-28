// "use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductBanner from "../_components/ProductBanner";
import ProductInfo from "../_components/ProductInfo";
import ProductApis from "../../_utils/ProductApis";
import ProductList from "@/app/_components/ProductList";
// import { use, useEffect, useState } from "react";
// import ProductApis from "../../_utils/ProductApis";
// import ProductBanner from "../_components/ProductBanner";
// import ProductInfo from "../_components/ProductInfo";

// export default function ProductDetails({
//   params,
// }: {
//   params: Promise<{ productId: string }>;
// }) {
//   // Unwrap the params Promise (Next.js 15+ requirement)
//   const { productId } = use(params);

//   // State to store the product data
//   const [product, setProduct] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // useEffect to fetch product data when productId changes
//   useEffect(() => {
//     const getProductById_ = async () => {
//       try {
//         setLoading(true);
//         const res = await ProductApis.getProductById(productId);
//         console.log("product item", res.data.data[0]);

//         // Strapi 5 filtered API returns an array, so we take the first item
//         const productData = res.data.data[0];
//         setProduct(productData);
//         setError(null);
//       } catch (err: unknown) {
//         console.error("Error fetching product:", err);
//         const errorMessage =
//           err instanceof Error ? err.message : "Failed to fetch product";
//         setError(errorMessage);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (productId) {
//       getProductById_();
//     }
//   }, [productId]); // Re-run when productId changes

//   // Render loading state
//   if (loading) {
//     return (
//       <div className="p-10 py-25">
//         <h1 className="text-2xl font-bold">Loading Product {productId}...</h1>
//       </div>
//     );
//   }

//   // Render error state
//   if (error) {
//     return (
//       <div className="p-10 py-25">
//         <h1 className="text-2xl font-bold text-red-500">Error: {error}</h1>
//       </div>
//     );
//   }

//   // Render product data
//   return (
//     <div className="px-10 py-8 md:px-20">
//       <Breadcrumb>
//         <BreadcrumbList>
//           <BreadcrumbItem>
//             <BreadcrumbLink href="/">Home</BreadcrumbLink>
//           </BreadcrumbItem>
//           <BreadcrumbSeparator />
//           <BreadcrumbItem>
//             <BreadcrumbLink href="/components">Components</BreadcrumbLink>
//           </BreadcrumbItem>
//           <BreadcrumbSeparator />
//           <BreadcrumbItem>
//             <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
//           </BreadcrumbItem>
//         </BreadcrumbList>
//       </Breadcrumb>
//       <div className="flex-col md:flex-row flex gap-5 mt-10 justify-around ">
//         <ProductBanner product={product} />
//         <ProductInfo />
//       </div>
//       <h1 className="text-2xl font-bold">Product ID: {productId}</h1>
//       {product && (
//         <div className="mt-4">
//           <h2 className="text-xl font-semibold">
//             {product.title || product.attributes?.title || "No title"}
//           </h2>
//           <p className="text-lg text-green-600 mt-2">
//             Price: ${product.price || product.attributes?.price || "N/A"}
//           </p>

//           {/* Handle Strapi Blocks format for description */}
//           <div className="mt-4">
//             <h3 className="font-semibold">Description:</h3>
//             {typeof product.description === "string" ? (
//               <p className="text-gray-600">{product.description}</p>
//             ) : (
//               <p className="text-gray-500 italic">
//                 Rich text description (Blocks format)
//               </p>
//             )}
//           </div>

//           {/* Debug: Show raw data */}
//           <details className="mt-4">
//             <summary className="cursor-pointer text-blue-600">
//               Show Raw Data
//             </summary>
//             <pre className="mt-2 bg-gray-100 p-4 rounded text-xs overflow-auto max-h-96">
//               {JSON.stringify(product, null, 2)}
//             </pre>
//           </details>
//         </div>
//       )}
//     </div>
//   );
// }

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  // const path = usePathname();
  const { productId } = await params;
  const product = await ProductApis.getProductById(productId);
  const relatedProducts = await ProductApis.getProductsByCategory(
    product.category
  );
  console.log(product);
  console.log(productId);
  return (
    <div className="px-10 py-5 md:px-20">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/product-details">
              product-details
            </BreadcrumbLink>
            {/* We know we are in the 'product-details' path segment */}
            {/* <span className="hover:text-foreground transition-colors">
              product-details
            </span> */}
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{productId}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className=" grid gap-5 mt-10 grid-cols-1 sm:grid-cols-2 sm:gap-0 ">
        <ProductBanner product={product} />
        <ProductInfo product={product} />
      </div>
      <h1>similar products </h1>
      <ProductList productList={relatedProducts} />
    </div>
  );
};

export default ProductDetails;
