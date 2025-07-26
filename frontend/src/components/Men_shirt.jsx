import React from "react";
import ProductPageTemplate from "./ProductPageTemplate";
import "../styles/Women_T_shirt.css";

const Men_shirt = () => {
  return (
    <ProductPageTemplate 
      categoryPath="men/shirt"
      pageTitle="Men Shirt"
      cssClassName="women-tshirt-container"
    />
  );
};

export default Men_shirt;