import mongoose, { trusted } from "mongoose";

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    content: {
        type: String,
        required: true,

    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments"
        }
    ],

}, { timestamps: true })

const Post = mongoose.model("Post", PostSchema);
export default Post;