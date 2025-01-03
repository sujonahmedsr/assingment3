import { model, Schema } from "mongoose";
import { blogInterface } from "./blog.Interface";

// blog model schema 
const blogSchemaModel = new Schema<blogInterface>({
    title: {
        type: String,
        required: [true, 'Title field is required.']
    },
    content: {
        type: String,
        required: [true, 'Content field is required.']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

// blog model 
export const blogModel = model<blogInterface>('Blogs', blogSchemaModel)