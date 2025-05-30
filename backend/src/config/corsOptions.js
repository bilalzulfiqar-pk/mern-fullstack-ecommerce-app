const allowedOrigins = [
  "http://localhost:5173", // Vite dev environment
  "https://ecommerce-fullstack-website.vercel.app", // Vercel domain
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests like Postman, curl, mobile apps with no origin
    if (!origin) {
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Single-line log for blocked origins
    console.log(`CORS: Blocking request from origin ${origin}`);
    return callback(null, false);
    // return  callback(new Error("Not allowed by CORS"));
  },
  credentials: true, // Important if using cookies or sessions
};

module.exports = corsOptions;
