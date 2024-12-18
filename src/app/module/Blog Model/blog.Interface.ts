import mongoose from "mongoose";

export interface blogInterface {
    title: string,
    content: string,
    author: mongoose.Schema.Types.ObjectId,
    isPublished: boolean
}