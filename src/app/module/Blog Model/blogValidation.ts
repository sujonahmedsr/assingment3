import { z } from "zod"

const blogValidationSchema = z.object({
    title: z.string(),
    content: z.string(),
    author: z.string()
})
const updateBlogValidationSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    author: z.string().optional()
})
export const blogValidation = {
    blogValidationSchema,
    updateBlogValidationSchema
}