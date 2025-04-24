# 🛒 E-Commerce Web Application

## 🚀 Overview
A full-featured **MERN stack** e-commerce platform offering an intuitive shopping experience, secure user authentication, advanced filtering, dynamic admin management, and a fully responsive design.  

Built for **performance**, **scalability**, and **real-world eCommerce** scenarios.

## 🌐 Live Demo  
🔗 [Check it Out](https://ecommerce-fullstack-website.vercel.app/)

---

## ✨ Features

### 🏠 Home Page
- Displays **featured products** and **trending categories**.
- **Promotional banners**.
- **Live search**.

### 📦 Product Listing
- **Advanced filters**: Category, price range, ratings, and more.
- **Sorting options**: Price, discount, and popularity.
- **Pagination & Grid/List toggle**.
- **Verified sellers** badge display.

### 🛍️ Product Details
- **Cloudinary-hosted images**.
- **Bulk pricing** for wholesale buyers.
- **Supplier & shipping details**.
- **Customer reviews & ratings**.
- **Live stock status**.

### 👤 User Authentication
- **Register / Login** with form validation.
- **JWT-based secure auth**.
- **Role-based access** (User/Admin).
- **Protected routes**: Cart, checkout, order history.

### 🛒 Cart & Checkout
- Add/remove/update cart items.
- Auto-price updates by quantity.
- Save cart data for logged-in users.
- **Shipping details form**.
- **Stripe payment integration (Test mode)**.

### 🧾 Orders System
- Place orders with Stripe payment.
- View **order history**, status, and details.
- Admin can **view, update, approve, or cancel** orders.

### ⭐ Review System
- Users can leave **star ratings and comments** on products they've received.
- **Average rating** auto-calculated and updated.

### ❤️ Favorites
- Users can **add or remove products to favorites**.
- Favorites persist for logged-in users.

### 🌍 Multi-Language Support
- Built-in **translation system** using the **Google Translate widget**.
- Supports multiple languages including **English**, **Urdu**, **French**, **Spanish**, etc.
- **Language switcher** available in both the **navbar dropdown** and **drawer (off-canvas sidebar)**.

### ⚙️ Profile Settings
- Users can update their **name**, and **password**.

### 🛠️ Admin Panel
- Add/edit/delete products.
- View/manage orders.
- Protected with **admin-only routes**.

---

## 📱 Responsive Design
- Optimized for **mobile, tablet, and desktop**.
- Built with **Tailwind CSS** for flexibility and responsiveness.

---

## 🧰 Tech Stack

| Frontend       | Backend         | Other         |
|----------------|------------------|----------------|
| React + Vite   | Node.js + Express | MongoDB (Mongoose) |
| Tailwind CSS   | JWT Auth          | Cloudinary (Images) |
| React Router   | Stripe API (Test) | SweetAlert2 (UI Alerts) |

---

## 🔧 Development Status
The application is actively being developed. Future updates may include **contact support with chat** and **suppliers profile**.

---

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
Create a `.env` file in the `main` directory and add the necessary environment variables. Example:
```
VITE_STRIPE_PUBLISHABLE_KEY==your_stripe_key
```

Create a `.env` file in the `backend` directory and add the necessary environment variables. Example:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
```

### 4️⃣ Run the Project  
**Start Backend:**
```
cd backend
npm run dev
```

**Start Frontend:**
```
npm run dev
```

---

### 💡 Want to Contribute?
If you'd like to contribute, feel free to fork the repository and submit a pull request. 🚀
