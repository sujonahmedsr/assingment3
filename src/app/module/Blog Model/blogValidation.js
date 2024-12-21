"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = void 0;
const zod_1 = require("zod");
const blogValidationSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
const updateBlogValidationSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
});
exports.blogValidation = {
    blogValidationSchema,
    updateBlogValidationSchema
};
