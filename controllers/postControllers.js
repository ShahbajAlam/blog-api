import { Post } from "../models/postModels.js";

const addNewPost = async (req, res) => {
    const { title, body } = req.body;
    const { _id } = req.author;

    if (!title || !body)
        return res.status(400).json({ error: "All fields are required" });

    try {
        const post = await Post.create({ title, body, author: _id });
        return res.status(200).json({ success: true, post });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUserPosts = async (req, res) => {
    const { _id } = req.author;
    console.log(_id);
    try {
        const posts = await Post.find({ author: _id });
        res.status(200).json({ success: true, posts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllPosts = async (_, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({
            success: true,
            count: posts.length,
            posts,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.author;
    try {
        const document = await Post.findById(id);
        if (!document.author.equals(_id)) {
            return res
                .status(401)
                .json({ error: "You can not delete this post" });
        }
        await Post.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            deletedID: document._id,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.author;
    const { title, body } = req.body;

    try {
        const post = await Post.findById(id);
        if (!post.author.equals(_id)) {
            return res
                .status(401)
                .json({ error: "You can not update this post" });
        }
        await Post.findByIdAndUpdate(id, { $set: { title, body } });
        const updatedPost = await Post.findById(id);
        res.status(200).json({ success: true, updatedPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { addNewPost, getAllPosts, getUserPosts, deletePost, updatePost };
