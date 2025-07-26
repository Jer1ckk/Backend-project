import React from "react";
import ProductPageTemplate from "./ProductPageTemplate";
import "../styles/Women_T_shirt.css";

const Women_T_shirt = () => {
  return (
    <ProductPageTemplate
      categoryPath="t-shirt"
      pageTitle="Women T-Shirt"
      cssClassName="women-tshirt-container"
    />
  );
};

export default Women_T_shirt;
