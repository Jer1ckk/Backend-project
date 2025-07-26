import React from "react";
import ProductPageTemplate from "./ProductPageTemplate";
import "../styles/Women_T_shirt.css";

const Men_T_shirt = () => {
  return (
    <ProductPageTemplate 
      categoryPath="men/t-shirt"
      pageTitle="Men T-shirt"
      cssClassName="women-tshirt-container"
    />
  );
};

export default Men_T_shirt;