const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.io setup - Note: Standard Socket.io does not work out-of-the-box on Vercel Serverless Functions.
// For real-time features on Vercel, consider using Pusher or Ably.
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet({
    contentSecurityPolicy: false,
}));

// Root route for health check
app.get("/", (req, res) => {
    res.send("Food Delivery API is running...");
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);

// MongoDB connection with error handling
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => { console.error("MongoDB Connection Error:", err) });
} else {
    console.error("MONGO_URI is not defined in environment variables");
}

app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/users", userRoutes);

io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);
    
    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});

module.exports = app;