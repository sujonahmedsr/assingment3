"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogModel = void 0;
const mongoose_1 = require("mongoose");
// blog model schema 
const blogSchemaModel = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title field is required.']
    },
    content: {
        type: String,
        required: [true, 'Content field is required.']
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
// blog model 
exports.blogModel = (0, mongoose_1.model)('Blogs', blogSchemaModel);
