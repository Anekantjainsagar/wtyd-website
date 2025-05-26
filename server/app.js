require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/Admin/adminRoutes");

// Import middleware
const errorHandler = require("./middlewares/errorMiddleware");

// Initialize Express app
const app = express();

// 1. DATABASE CONNECTION
connectDB();

// 2. GLOBAL MIDDLEWARES

// Security headers
app.use(helmet());

// Enable CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Cookie parser
app.use(cookieParser());

// Passport middleware
require("./config/googleOAuth"); // Load passport config
app.use(passport.initialize());

// 3. ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running healthy",
  });
});

// 4. ERROR HANDLING
app.use(errorHandler);

// 5. START SERVER
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection Error:", err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception Error:", err.message);
  server.close(() => {
    process.exit(1);
  });
});
