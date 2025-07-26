import React from "react";
import ProductPageTemplate from "./ProductPageTemplate";
import "../styles/Women_T_shirt.css";

const Girls_clothing = () => {
  return (
    <ProductPageTemplate 
      categoryPath="girls/clothing"
      pageTitle="Girls Clothing"
      cssClassName="women-tshirt-container"
    />
  );
};

export default Girls_clothing;