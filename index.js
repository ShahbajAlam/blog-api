import cors from "cors";
import "dotenv/config.js";
import express from "express";
import mongoose from "mongoose";

import { postRoutes } from "./routes/postRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

mongoose
    .connect(process.env.DB_URI, {
        dbName: "posts",
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.log(err));
