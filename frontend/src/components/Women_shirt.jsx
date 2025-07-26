import React from "react";
import ProductPageTemplate from "./ProductPageTemplate";
import "../styles/Women_T_shirt.css";

const Women_shirt = () => {
  return (
    <ProductPageTemplate 
      categoryPath="shirt"
      pageTitle="Women Shirt"
      cssClassName="women-tshirt-container"
    />
  );
};

export default Women_shirt;
