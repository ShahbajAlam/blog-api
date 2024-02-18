import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        authorID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        author: {
            type: mongoose.Schema.Types.String,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export { Post };
