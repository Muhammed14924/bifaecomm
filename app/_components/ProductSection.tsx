// "use client";
import ProductList from "./ProductList";
import ProductApis from "../_utils/ProductApis";
// import { useEffect, useState } from "react";
// const ProductSection = () => {
//   const [productList, setProductList] = useState([]);

//   const getLatestProducts_ = () => {
//     ProductApis.getLatestProducts().then((res) => {
//       console.log(res.data.data);
//       setProductList(res.data.data);
//     });
//   };
//   useEffect(() => {
//     getLatestProducts_();
//   }, []);
//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-center my-4">Latest Products</h2>
//       <ProductList productList={productList} />
//     </div>
//   );
// };

// export default ProductSection;

const ProductSection = async () => {
  const productList = await ProductApis.getLatestProducts();
  console.log(productList);
  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-4">Latest Products</h2>
      <ProductList productList={productList} />
    </div>
  );
};

export default ProductSection;
