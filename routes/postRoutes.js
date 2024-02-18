import express from "express";
import {
    addNewPost,
    deletePost,
    getAllPosts,
    getUserPosts,
    updatePost,
} from "../controllers/postControllers.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// Inserting a new post
// POST request
// api/posts
router.post("/", auth, addNewPost);

// Get all posts
// GET request
// api/posts
router.get("/", getAllPosts);

// Delete a post
// DELETE request
// api/posts/:id
router.delete("/:id", auth, deletePost);

// Update a post
// PATCH request
// api/posts/:id
router.patch("/:id", auth, updatePost);

// Get an user posts
// GET request
// api/posts/myposts
router.get("/myposts", auth, getUserPosts);

export { router as postRoutes };
