const Order = require("../models/order");
const Product = require("../models/product"); // To check if the product exists
const User = require("../models/user"); // To find the user who placed the order

// Place Order Controller
const placeOrder = async (req, res) => {
  const userId = req.user.id; // Extracted from token
  const { cartItems, shippingDetails } = req.body; // Get data from the request body

  try {
    // Ensure that user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Prepare the products in the order
    const orderProducts = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        // Safely default tax to 0 if undefined
        const tax = product.tax || 0;

        return {
          productId: product._id,
          name: product.name,
          qty: item.qty,
          price: product.currentPrice,
          previousPrice: product.previousPrice || null,
          tax,
          image: product.image,
          supplier: product.supplier?.name || "",
        };
      })
    );

    // Calculate subtotal using previousPrice if it exists, else currentPrice
    const subtotal = parseFloat(
      orderProducts
        .reduce((acc, item) => {
          const priceToUse =
            item.previousPrice > 0 ? item.previousPrice : item.price;
          return acc + priceToUse * item.qty;
        }, 0)
        .toFixed(2)
    );

    // Calculate total discount
    const totalDiscount = parseFloat(
      orderProducts
        .reduce((acc, item) => {
          const hasDiscount = item.previousPrice > 0 && item.price;
          const discount = hasDiscount
            ? (item.previousPrice - item.price) * item.qty
            : 0;
          return acc + discount;
        }, 0)
        .toFixed(2)
    );

    // Calculate total tax
    const totalTax = parseFloat(
      orderProducts
        .reduce((acc, item) => {
          return acc + (item.tax || 0) * item.qty;
        }, 0)
        .toFixed(2)
    );

    // Final total price
    const totalPrice = parseFloat(
      (subtotal - totalDiscount + totalTax).toFixed(2)
    );

    // Create the order
    const order = new Order({
      user: user._id,
      products: orderProducts,
      shippingDetails,
      subtotal,
      totalDiscount,
      totalTax,
      totalPrice,
    });

    // Save the order in the database
    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error placing order", error: error.message });
  }
};

// Get all orders (Admin only)
const getAllOrders = async (req, res) => {
  try {
    // // Check if the user is admin
    // const user = await User.findById(req.user.id);
    // if (!user || !user.isAdmin) {
    //   return res.status(403).json({ message: "Access denied. Admins only." });
    // }

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email") // Populate user name/email
      .populate("products.productId", "name image"); // Populate product info

    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: err.message });
  }
};

// const getOrders = async (req, res) => {
//   try {
//     const { status, searchQuery, page = 1, limit = 10 } = req.query;

//     // Building the filter object for the status
//     const filter = status && status !== "all" ? { status } : {};

//     console.log(searchQuery, page, limit);
//     console.log(filter);

//     // If a search query exists, add it to the filter
//     if (searchQuery) {
//       const searchRegex = new RegExp(searchQuery, "i"); // Case-insensitive search
//       filter.$or = [
//         { _id: searchRegex }, // Match Order ID
//         { "user.name": searchRegex }, // Match User Name
//       ];
//     }

//     console.log("2",filter);

//     const skip = (page - 1) * limit;

//     // Count the total orders matching the filter
//     const totalOrders = await Order.countDocuments(filter);
//     const totalPages = Math.ceil(totalOrders / limit);

//     // Fetch orders with pagination and filters
//     const orders = await Order.find(filter)
//       .skip(skip)
//       .limit(Number(limit))
//       .sort({ createdAt: -1 })
//       .populate("user", "name email")
//       .populate("products.productId", "name image");

//     res.status(200).json({ orders, totalPages });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error fetching orders", error: err.message });
//   }
// };

const mongoose = require("mongoose");

const getOrders = async (req, res) => {
  try {
    const { status, searchQuery, page = 1, limit = 10 } = req.query;

    const matchStage = {};
    if (status && status !== "all") {
      matchStage.status = status;
    }

    const skip = (page - 1) * limit;

    // Aggregation pipeline
    const pipeline = [
      { $match: matchStage },

      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },

      {
        $addFields: {
          products: {
            $map: {
              input: "$products",
              as: "p",
              in: {
                $mergeObjects: [
                  "$$p",
                  {
                    productDetail: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$productDetails",
                            as: "d",
                            cond: { $eq: ["$$d._id", "$$p.productId"] },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },

      {
        $project: {
          productDetails: 0, // remove extra field
        },
      },
    ];

    // Add search filter if query exists
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      pipeline.push({
        $match: {
          $or: [
            {
              _id: mongoose.Types.ObjectId.isValid(searchQuery)
                ? new mongoose.Types.ObjectId(searchQuery)
                : null,
            },
            { "user.name": { $regex: regex } },
          ],
        },
      });
    }

    // Clone pipeline to count documents before applying skip/limit
    const countPipeline = [...pipeline, { $count: "total" }];
    const countResult = await Order.aggregate(countPipeline);
    const totalOrders = countResult[0]?.total || 0;
    const totalPages = Math.ceil(totalOrders / limit);

    // Apply sorting, pagination
    pipeline.push({ $sort: { createdAt: -1 } });
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: Number(limit) });

    const orders = await Order.aggregate(pipeline);

    res.status(200).json({ orders, totalPages });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: err.message });
  }
};

// Route to get order details by ID (Admin only)
const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("products.productId", "name image");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching order details", error: err.message });
  }
};

// Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    // // Check admin
    // const user = await User.findById(req.user.id);
    // if (!user || !user.isAdmin) {
    //   return res.status(403).json({ message: "Access denied. Admins only." });
    // }

    // const validStatuses = Order.schema.path("status").enumValues; // Get valid statuses from the schema
    const validStatuses = ["pending", "approved", "cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // order.status = status.toLowerCase(); // Ensure status is always stored as lowercase
    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating order", error: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status = "all", searchQuery = "", page = 1, limit = 10 } = req.query;

    const matchStage = { user: new mongoose.Types.ObjectId(userId) };

    if (status !== "all") {
      matchStage.status = status;
    }

    const skip = (page - 1) * limit;

    const pipeline = [
      { $match: matchStage },

      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },

      {
        $addFields: {
          products: {
            $map: {
              input: "$products",
              as: "p",
              in: {
                $mergeObjects: [
                  "$$p",
                  {
                    productDetail: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$productDetails",
                            as: "d",
                            cond: { $eq: ["$$d._id", "$$p.productId"] },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },

      {
        $project: {
          productDetails: 0, // remove extra field
        },
      },
    ];

    // Add searchQuery filter
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");

      pipeline.push({
        $match: {
          $or: [
            {
              _id: mongoose.Types.ObjectId.isValid(searchQuery)
                ? new mongoose.Types.ObjectId(searchQuery)
                : null,
            },
          ],
        },
      });
    }

    // Count pipeline
    const countPipeline = [...pipeline, { $count: "total" }];
    const countResult = await Order.aggregate(countPipeline);
    const totalOrders = countResult[0]?.total || 0;
    const totalPages = Math.ceil(totalOrders / limit);

    // Add sorting, pagination
    pipeline.push({ $sort: { createdAt: -1 } });
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: Number(limit) });

    const orders = await Order.aggregate(pipeline);

    res.status(200).json({ orders, totalPages });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching your orders",
      error: err.message,
    });
  }
};

const getMyOrderDetails = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id, // restrict to their own orders
    }).populate("products.productId", "name image");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order", error: err.message });
  }
};

module.exports = {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
  getOrders,
  getOrderDetails,
  getMyOrders,
  getMyOrderDetails,
};
