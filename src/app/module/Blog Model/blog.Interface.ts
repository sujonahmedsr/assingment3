import mongoose from "mongoose";

// blog interface create
export interface blogInterface {
    title: string,
    content: string,
    author: mongoose.Schema.Types.ObjectId,
    isPublished: boolean
}