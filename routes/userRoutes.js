import express from "express";
import { login, signup } from "../controllers/userControllers.js";

const router = express.Router();

// Register an user
// POST request
// api/users/signup
router.post("/signup", signup);

// Login
// POST request
// api/users/login
router.post("/login", login);

export { router as userRoutes };
