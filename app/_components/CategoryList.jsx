import CardFlip from "@/components/mvpblocks/card-flip";

const CategoryList = ({ categoryList }) => {
  return (
    <div className="mt-10 container">
      <h2 className="font-bold text-3xl text-[#8a1818] text-center mb-8">
        التصنيفات الرئيسية
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
        {categoryList.map((category, index) => (
          <CardFlip
            key={index}
            name={category.name}
            imageUrl={category?.image?.[0]?.url}
            href={`/products-category/${category.name}`}
            description={
              category?.description ||
              `تصفح منتجات ${category.name} واكتشف أفضل العروض`
            }
            features={["جودة عالية", "أسعار مناسبة", "توصيل سريع"]}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
