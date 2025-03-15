const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db"); // Import database connection
const Product = require("./src/models/product"); // Import Product model

dotenv.config(); // Load .env variables

const insertProducts = async () => {
  try {
    await connectDB(); // Connect to MongoDB

    // Delete existing products
    await Product.deleteMany({});
    console.log("Existing products deleted");

    // Product Data
    const products = [
        {
          image: "/cloth/1.jpg",
          name: "Stylish Cotton T-Shirt - Multiple Colors",
          categories: ["Clothing", "Summer Clothes", "Casual Wear"],
          currentPrice: 24.0,
          bulkPricing: [
            { minQuantity: 50, maxQuantity: 100, price: 22.0 },
            { minQuantity: 101, maxQuantity: 500, price: 20.0 },
            { minQuantity: 501, maxQuantity: null, price: 18.0 },
          ],
          previousPrice: 30.0,
          rating: 4.0,
          reviews: 20,
          orders: 120,
          stock: 33,
          shipping: "Free Shipping",
          description:
            "Soft and comfortable cotton T-shirt available in multiple colors.",
          type: "Casual Wear",
          material: "Cotton",
          sizes: ["Small", "Medium", "Large", "XL"],
          customization: "Custom logo and design available",
          protection: "Refund Policy",
          warranty: "1 year warranty",
          supplier: {
            name: "Guanjoi Trading LLC",
            location: "Istanbul, Turkiye",
            verified: true,
            worldwideShipping: true,
          },
        },
        {
          image: "/cloth/2.jpg",
          name: "Unisex Blue T-Shirt - Premium Fabric",
          categories: ["Clothing", "Casual Wear", "Summer Clothes"],
          currentPrice: 29.9,
          bulkPricing: [
            { minQuantity: 30, maxQuantity: 80, price: 28.0 },
            { minQuantity: 81, maxQuantity: 300, price: 26.5 },
            { minQuantity: 301, maxQuantity: null, price: 25.0 },
          ],
          previousPrice: 35.0,
          rating: 4.2,
          reviews: 85,
          orders: 85,
          stock: 25,
          shipping: "Free Shipping",
          description:
            "High-quality unisex T-shirt in blue with premium breathable fabric.",
          type: "Casual Wear",
          material: "Cotton Blend",
          sizes: ["Small", "Medium", "Large", "XL"],
          customization: "Available for bulk orders",
          protection: "Money-back guarantee",
          warranty: "6 months warranty",
          supplier: {
            name: "Jiangsu Textile Ltd.",
            location: "Shanghai, China",
            verified: true,
            worldwideShipping: true,
          },
        },
        {
          image: "/cloth/3.jpg",
          name: "Casual Winter Jacket - Brown Color",
          categories: ["Clothing", "Winter Wear", "Outerwear"],
          currentPrice: 790.5,
          bulkPricing: [
            { minQuantity: 10, maxQuantity: 50, price: 750.0 },
            { minQuantity: 51, maxQuantity: 200, price: 720.0 },
            { minQuantity: 201, maxQuantity: null, price: 700.0 },
          ],
          previousPrice: 850.0,
          rating: 4.8,
          reviews: 60,
          orders: 60,
          stock: 0,
          shipping: "Free Shipping",
          description:
            "Stylish brown winter jacket with cozy interior for warmth and comfort.",
          type: "Winter Wear",
          material: "Faux Leather & Fleece",
          sizes: ["Medium", "Large", "XL"],
          customization: "Custom embroidery available",
          protection: "Quality assurance guarantee",
          warranty: "2 years warranty",
          supplier: {
            name: "Arctic Gear Inc.",
            location: "Toronto, Canada",
            verified: true,
            worldwideShipping: true,
          },
        },
        {
          image: "/tech/5.jpg",
          name: "Gaming Headset with Microphone",
          categories: ["Tech", "Electronics", "Gaming Accessories", "Headsets"],
          currentPrice: 98.95,
          bulkPricing: [
            { minQuantity: 20, maxQuantity: 100, price: 95.0 },
            { minQuantity: 101, maxQuantity: 300, price: 90.0 },
            { minQuantity: 301, maxQuantity: null, price: 85.0 },
          ],
          previousPrice: 149.99,
          rating: 4.2,
          reviews: 61,
          orders: 61,
          stock: 20,
          shipping: "Free Shipping",
          description:
            "High-quality gaming headset with noise cancellation and a built-in mic.",
          type: "Gaming Accessories",
          material: "Plastic & Memory Foam",
          customization: "Logo printing available",
          protection: "Warranty claim available",
          warranty: "1-year manufacturer warranty",
          supplier: {
            name: "TechSound Electronics",
            location: "Berlin, Germany",
            verified: true,
            worldwideShipping: true,
          },
        },
        {
          image: "/interior/4.jpg",
          name: "Interior Plant with Natural Vase",
          categories: ["Interiors", "Home Decor", "Plants"],
          currentPrice: 68.99,
          bulkPricing: [
            { minQuantity: 10, maxQuantity: 50, price: 65.0 },
            { minQuantity: 51, maxQuantity: 150, price: 60.0 },
            { minQuantity: 151, maxQuantity: null, price: 55.0 },
          ],
          previousPrice: 94.0,
          rating: 3.2,
          reviews: 61,
          orders: 61,
          stock: 5,
          shipping: "Free Shipping",
          description:
            "Beautiful indoor plant with a stylish natural vase for home decor.",
          type: "Home Decor",
          material: "Ceramic & Plant",
          customization: "Pot color customization available",
          protection: "Damage replacement policy",
          warranty: "3-month plant health warranty",
          supplier: {
            name: "GreenLife Nurseries",
            location: "California, USA",
            verified: true,
            worldwideShipping: false,
          },
        },
        {
          image: "/tech/6.jpg",
          name: "GoPro HERO6 4K Action Camera - Black",
          categories: ["Tech", "Electronics", "Cameras", "Action Cameras"],
          currentPrice: 99.5,
          bulkPricing: [
            { minQuantity: 5, maxQuantity: 20, price: 95.0 },
            { minQuantity: 21, maxQuantity: 50, price: 90.0 },
            { minQuantity: 51, maxQuantity: null, price: 85.0 },
          ],
          previousPrice: 1128.0,
          rating: 4.2,
          reviews: 75,
          orders: 75,
          stock: 2,
          shipping: "Free Shipping",
          description:
            "High-performance 4K action camera for adventure and sports recording.",
          type: "Electronics",
          material: "Plastic & Metal",
          customization: "Brand logo engraving available",
          protection: "1-month replacement policy",
          warranty: "1-year international warranty",
          supplier: {
            name: "ActionCam Ltd.",
            location: "Tokyo, Japan",
            verified: true,
            worldwideShipping: true,
          },
        },
        {
          image: "/interior/1.jpg",
          name: "Office Chair Soft Material - Yellow Color",
          categories: ["Interiors", "Office Furniture", "Home Decor"],
          currentPrice: 390.0,
          bulkPricing: [
            { minQuantity: 5, maxQuantity: 20, price: 370.0 },
            { minQuantity: 21, maxQuantity: 100, price: 350.0 },
          ],
          previousPrice: null,
          rating: 3.5,
          reviews: 61,
          orders: 61,
          stock: 6,
          shipping: "Free Shipping",
          description:
            "Ergonomic office chair with soft cushioning for long hours of comfort.",
          type: "Office Furniture",
          material: "Leather & Metal",
          sizes: ["One Size"],
          customization: "Available in multiple colors",
          protection: "Warranty Coverage",
          warranty: "2 years",
          supplier: {
            name: "Comfort Chairs Ltd.",
            location: "Berlin, Germany",
            verified: true,
            worldwideShipping: true,
          },
        },
      ];

    // Insert New Products
    await Product.insertMany(products);
    console.log("Products inserted successfully!");

    // Close MongoDB Connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting products:", error);
    process.exit(1);
  }
};

// Run the function
insertProducts();
