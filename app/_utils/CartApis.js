import axiosClient from "./axiosClient";

const addToCart = (payload) =>
  axiosClient
    .post("/carts", payload)
    .then((res) => {
      return (res.data, console.log("successfully added to cart", res));
    })
    .catch((err) => console.log("error adding to cart", err));

export default addToCart;
