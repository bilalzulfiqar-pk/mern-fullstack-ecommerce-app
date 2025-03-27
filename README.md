# E-Commerce Web Application

## 🚀 Overview
This is a **MERN stack-based** full-stack e-commerce web application. It provides a smooth online shopping experience with dynamic product listings, cart management, user authentication, and an admin panel for product management.

## ✨ Features

### 🔹 Home Page
- Displays **featured products** and **trending categories**.
- **Dynamic banner images** for promotions.
- **Search bar** with instant filtering.

### 🔹 Product Listing Page
- **Filters:** Sort by category, price range, verified sellers, and rating.
- **Sorting:** Price (low-high, high-low), discount percentage.
- **Pagination:** Load more products efficiently.
- **Grid/List Toggle:** View products in different layouts.

### 🔹 Product Details Page
- **High-quality images** fetched from **Cloudinary**.
- **Bulk pricing options** for wholesale purchases.
- **Supplier details** with verification status.
- **Ratings & reviews** section.
- **Stock availability & shipping details.**

### 🔹 User Authentication
- **Register & Login** functionality.
- **JWT-based authentication** for security.
- **Role-based access** for users and admins.
- **Protected Routes:** Only authenticated users can access cart and checkout pages.
- **Admin Access:** Only admins can manage products.

### 🔹 Cart Management
- **Add to cart** and **remove items** dynamically.
- **Quantity selection** for each product.
- **Automatic price updates** based on quantity.
- **Persists cart data** for logged-in users.

### 🔹 Admin Panel
- **Create new products** with images, pricing, and categories.
- **Edit existing products** with real-time updates.
- **Delete products** with confirmation dialogs.
- **Protected routes** ensuring only admins can access.

## 📱 Responsive Design
- Fully optimized for **mobile, tablet, and desktop**.
- Uses **Tailwind CSS** for a flexible layout.

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Database:** MongoDB with Mongoose ORM
- **Storage:** Cloudinary for image hosting
- **Authentication:** JWT (JSON Web Token)

## 🔧 Development Status
The application is actively being developed. Future updates may include **order processing** and **payment integration**.

## 🛠 How to Run the Project

Follow these steps to set up and run the project locally:

### 1️⃣ Clone the Repository
```
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies  
**For Frontend:**
```
npm install
```

**For Backend:**
```
cd backend
npm install
```

### 3️⃣ Set Up Environment Variables  
Create a `.env` file in the `backend` directory and add the necessary environment variables. Example:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run the Project  
**Start Backend:**
```
cd backend
npm run dev
```

**Start Frontend:**
```
cd frontend
npm run dev
```

---

### 💡 Want to Contribute?
If you'd like to contribute, feel free to fork the repository and submit a pull request. 🚀
