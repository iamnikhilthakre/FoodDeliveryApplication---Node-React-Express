    const express = require("express");
    const mongoose = require("mongoose");
    const cors = require("cors");
    const dotenv = require("dotenv");
    const helmet = require("helmet");
    const cookieParser = require("cookie-parser");
    const rateLimit = require("express-rate-limit");

    const authRoutes = require("./routes/authRoutes");
    const foodRoutes = require("./routes/foodRoutes");
    const orderRoutes = require("./routes/orderRoutes");
    const restaurantRoutes = require("./routes/restaurantRoutes");
    const userRoutes = require("./routes/userRoutes");

    dotenv.config();
    console.log("FRONTEND_URL =", process.env.FRONTEND_URL);

    const app = express();

    // CORS for Vercel
    // app.use(cors({
    //   origin: [
    //     'http://localhost:5173',
    //     'http://localhost:5174',
    //     process.env.FRONTEND_URL
    //   ].filter(Boolean),
    //   credentials: true
    // }));
    // app.use(express.json());
    // app.use(cookieParser());
    // app.use(helmet({
    //     contentSecurityPolicy: false,
    // }));
    app.set("trust proxy", 1);

    const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    process.env.FRONTEND_URL,
    ];
    console.log("Allowed Origins:", allowedOrigins);

    app.use(
    cors({
        origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        console.log("Blocked Origin:", origin);
        callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
    );

    app.use(express.json());
    app.use(cookieParser());
    app.use(
    helmet({
        contentSecurityPolicy: false,
    })
    );
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

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`Server Running on ${PORT}`);
    });

    module.exports = app;