require("dotenv").config(); // no need for ./backend/.env anymore
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/auth");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB(process.env.MONGO_URI); // use environment variable

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error handler (should be last)
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
