import axiosClient from "./axiosClient";
const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((res) => res.data.data);
const getCategory = () => axiosClient.get("/categories?populate=*");

const getSlider = () =>
  axiosClient.get("/sliders?populate=*").then((res) => res.data.data);

const getLatestProducts = () =>
  axiosClient.get("/products?populate=*").then((res) => res.data.data);
// For Strapi 5: Use documentId directly in the URL
// const getProductById = (documentId: string) =>
//   axiosClient.get(`/products/${documentId}?populate=*`);

// For Strapi 4 or to search by numeric ID: Use filters
const getProductById = (id: string) =>
  axiosClient
    .get(`/products?filters[id][$eq]=${id}&populate=*`)
    .then((res) => res.data.data[0]);
const getProductsByCategory = (category: string) =>
  axiosClient
    .get(`/products?filters[category][$eq]=${category}&populate=*`)
    .then((res) => res.data.data);
const ProductApis = {
  getLatestProducts,
  getProductById,
  getProductsByCategory,
  getCategoryList,
  getCategory,
  getSlider,
};

export default ProductApis;
