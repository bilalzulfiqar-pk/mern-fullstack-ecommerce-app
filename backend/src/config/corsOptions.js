const allowedOrigins = [
  "http://localhost:5173", // Vite dev environment
  "https://ecommerce-fullstack-website.vercel.app", // Vercel domain
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests like Postman, curl, mobile apps with no origin
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Important if using cookies or sessions
};

module.exports = corsOptions;
