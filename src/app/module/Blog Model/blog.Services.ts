import { blogInterface } from "./blog.Interface"
import { blogModel } from "./blog.Model.Schema"

const createBlogIntoDb = async (payload: blogInterface) => {
    const result = await blogModel.create(payload)
    return result
}
const getAllBlogDb = async () => {
    const result = await blogModel.find()
    return result
}
const getSingleBlogDb = async (id: string) => {
    const result = await blogModel.findById(id)
    return result
}
const updateSingleBlogDb = async (id: string, payload: blogInterface) => {
    const result = await blogModel.findByIdAndUpdate(id, payload, {new: true})
    return result
}
const deleteSingleBlogDb = async (id: string) => {
    const result = await blogModel.findByIdAndDelete(id)
    return result
}

export const blogServices = {
    createBlogIntoDb,
    getAllBlogDb,
    getSingleBlogDb,
    updateSingleBlogDb,
    deleteSingleBlogDb
}