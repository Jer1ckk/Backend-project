const { sequelize, Product, Category } = require("./models");

const checkDatabase = async () => {
  try {
    console.log("🔍 Checking database content...\n");

    const categories = await Category.findAll();
    const products = await Product.findAll();

    console.log("📊 Database Status:");
    console.log(`Categories: ${categories.length}`);
    console.log(`Products: ${products.length}\n`);

    console.log("📋 Categories:");
    categories.forEach((cat) => {
      console.log(`- ${cat.name} (slug: ${cat.slug}, id: ${cat.id})`);
    });

    console.log("\n📦 Products:");
    products.forEach((prod) => {
      console.log(`- ${prod.name} (categoryId: ${prod.categoryId})`);
    });

    // Check specific categories that should have products
    console.log("\n🔍 Products by Category:");
    const tshirts = await Product.findAll({
      include: {
        model: Category,
        where: { slug: "womens-t-shirts" },
      },
    });
    console.log(`Women's T-Shirts: ${tshirts.length} products`);

    const shirts = await Product.findAll({
      include: {
        model: Category,
        where: { slug: "womens-shirts" },
      },
    });
    console.log(`Women's Shirts: ${shirts.length} products`);

    const menTshirts = await Product.findAll({
      include: {
        model: Category,
        where: { slug: "mens-t-shirts" },
      },
    });
    console.log(`Men's T-Shirts: ${menTshirts.length} products`);
  } catch (error) {
    console.error("❌ Error checking database:", error);
  } finally {
    await sequelize.close();
  }
};

checkDatabase();
