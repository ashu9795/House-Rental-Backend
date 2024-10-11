// src/app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json({ limit: "120kb" })); // For parsing application/json
 // For parsing application/json
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // For parsing application/x-www-form-urlencoded
app.use(express.static("public")); // For serving static files
app.use(cookieParser()); // For parsing cookies

import userRouter from "./routes/user.router.js"; // Ensure this path is correct
import favoriteRouter from "./routes/favorite.router.js"; // Ensure this path is correct
import propRouter from "./routes/property.router.js";
import searchRouter from "./routes/search.router.js";
import filter from "./routes/filter.router.js";
import transactionRouter from "./routes/transaction.router.js";

// Correct the path to include the leading slash
app.use("/api/v1/user", userRouter);
app.use("/api/v1/favorite", favoriteRouter);
app.use("/api/v1/property", propRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/filter", filter);
app.use("/api/v1/transaction", transactionRouter);

export { app };
