import ProductItem from "./ProductItem";

const ProductList = ({ productList }: { productList: any }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4">
      {productList.map((product: any) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
