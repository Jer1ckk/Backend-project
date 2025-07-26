const fs = require('fs');
const path = require('path');

// Component configurations
const componentConfigs = [
  // Women's components
  { file: 'Women_jacket.jsx', categoryPath: 'jacket', pageTitle: 'Women Jacket' },
  { file: 'Women_shoes.jsx', categoryPath: 'shoes', pageTitle: 'Women Shoes' },
  { file: 'Women_skirt.jsx', categoryPath: 'skirt', pageTitle: 'Women Skirt' },
  { file: 'Women_shorts.jsx', categoryPath: 'shorts', pageTitle: 'Women Shorts' },
  { file: 'Women_jeans.jsx', categoryPath: 'jeans', pageTitle: 'Women Jeans' },
  { file: 'Women_trouser.jsx', categoryPath: 'trouser', pageTitle: 'Women Trouser' },
  { file: 'Women_dress.jsx', categoryPath: 'dress', pageTitle: 'Women Dress' },
  
  // Men's components
  { file: 'Men_T_shirt.jsx', categoryPath: 'men/t-shirt', pageTitle: 'Men T-shirt' },
  { file: 'Men_shirt.jsx', categoryPath: 'men/shirt', pageTitle: 'Men Shirt' },
  { file: 'Men_jacket.jsx', categoryPath: 'men/jacket', pageTitle: 'Men Jacket' },
  { file: 'Men_shoes.jsx', categoryPath: 'men/shoes', pageTitle: 'Men Shoes' },
  { file: 'Men_jeans.jsx', categoryPath: 'men/jeans', pageTitle: 'Men Jeans' },
  { file: 'Men_trouser.jsx', categoryPath: 'men/trouser', pageTitle: 'Men Trouser' },
  
  // Kids components
  { file: 'Girls_clothing.jsx', categoryPath: 'girls/clothing', pageTitle: 'Girls Clothing' },
  { file: 'Girls_shoes.jsx', categoryPath: 'girls/shoes', pageTitle: 'Girls Shoes' },
  { file: 'Boys_clothing.jsx', categoryPath: 'boys/clothing', pageTitle: 'Boys Clothing' },
  { file: 'Boys_shoes.jsx', categoryPath: 'boys/shoes', pageTitle: 'Boys Shoes' },
  
  // Accessories components
  { file: 'Accessories_glasses.jsx', categoryPath: 'accessories/glasses', pageTitle: 'Glasses' },
  { file: 'Accessories_watches.jsx', categoryPath: 'accessories/watches', pageTitle: 'Watches' },
  { file: 'Accessories_gloves.jsx', categoryPath: 'accessories/gloves', pageTitle: 'Gloves' },
  { file: 'Accessories_belt.jsx', categoryPath: 'accessories/belt', pageTitle: 'Belts' },
  { file: 'Accessories_hat.jsx', categoryPath: 'accessories/hat', pageTitle: 'Hats' },
  { file: 'Accessories_bag.jsx', categoryPath: 'accessories/bag', pageTitle: 'Bags' },
  { file: 'Accessories_wallet.jsx', categoryPath: 'accessories/wallet', pageTitle: 'Wallets' }
];

const generateComponentContent = (componentName, categoryPath, pageTitle) => {
  return `import React from "react";
import ProductPageTemplate from "./ProductPageTemplate";
import "../styles/Women_T_shirt.css";

const ${componentName} = () => {
  return (
    <ProductPageTemplate 
      categoryPath="${categoryPath}"
      pageTitle="${pageTitle}"
      cssClassName="women-tshirt-container"
    />
  );
};

export default ${componentName};`;
};

const updateComponents = () => {
  const componentsDir = path.join(__dirname, 'src', 'components');
  
  componentConfigs.forEach(config => {
    const componentName = config.file.replace('.jsx', '');
    const filePath = path.join(componentsDir, config.file);
    const content = generateComponentContent(componentName, config.categoryPath, config.pageTitle);
    
    try {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Updated ${config.file}`);
    } catch (error) {
      console.error(`❌ Error updating ${config.file}:`, error.message);
    }
  });
  
  console.log('\n🎉 All components updated successfully!');
  console.log('📦 All components now use API data instead of hardcoded data');
};

updateComponents();
