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
- **Product inquiry form**: Users can send product requests (with quantity and unit) directly to suppliers via a simple form.

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
- **Email confirmation via OTP**: Users must verify their email with a One-Time Password (OTP), sent from the platform’s company email, before placing orders.

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

You need to create two `.env` files: one for the **frontend** and one for the **backend**.

1. **Frontend (`main` directory):**
   Create a `.env` file in the `main` directory and add the following environment variables:

   ```bash
   VITE_API_BASE_URL=http://localhost:5000                # Backend API base URL
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key            # Stripe publishable key
   VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key        # Google reCAPTCHA site key
   ```

   *If `VITE_API_BASE_URL` is not set, it defaults to `http://localhost:5000`.*

2. **Backend (`backend` directory):**
   Create a `.env` file in the `backend` directory and add the following environment variables:

   ```bash
   MONGO_URI=your_mongodb_connection_string               # MongoDB connection string
   JWT_SECRET=your_jwt_secret                             # Secret key for JWT signing
   STRIPE_SECRET_KEY=your_stripe_secret                   # Stripe secret key

   RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key         # Google reCAPTCHA secret key for backend validation
   COMPANY_EMAIL=your_company_email                       # Sender email for outgoing platform emails

   GMAIL_USER=your_company_email_address                  # Gmail address used to send OTPs
   GMAIL_PASS=your_google_app_password                    # App password generated from Google account
   ```

   > 💡 *To generate a Google App Password for `GMAIL_PASS`, enable 2-Step Verification on your Google account and follow [this guide](https://support.google.com/accounts/answer/185833?hl=en) to create an app-specific password.*


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
