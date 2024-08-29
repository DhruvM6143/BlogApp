import mongoose, { Schema } from "mongoose";

const commentSchema = mongoose.Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    content: {
        type: String,
        required: true,
        maxlength: 1000,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

}, { timestamps: true });

const comment = mongoose.model('Comments', commentSchema);
export default comment;