import { StatusCodes } from "http-status-codes"
import AppError from "../../errors/AppError"
import { blogInterface } from "./blog.Interface"
import { blogModel } from "./blog.Model.Schema"

const createBlogIntoDb = async (payload: blogInterface) => {
    const result = await blogModel.create(payload)
    return result
}
const getAllBlogDb = async (query: any) => {
    const queryObj = { ...query }

    const excludedItem = ["search", "filter", "sortBy", "sortOrder"]
    excludedItem.forEach(key => delete queryObj[key])

    // search 
    let search = query?.search as string || ''
    const serachQuery = blogModel.find({
        $or: ['title', 'content'].map(field => ({
            [field]: { $regex: search, $options: 'i' }
        }))
    })

    // filter query
    const filterQuery = serachQuery.find(queryObj)

    // sortBy and sortOrder 
    let sortStr = 'createdAt'
    if (query?.sortBy && query?.sortOrder) {
        const sortBy = query.sortBy
        const sortOrder = query.sortOrder
        sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`
    }

    const sortBy = filterQuery.sort(sortStr)

    const result = await sortBy.find().populate('author')
    return result
}
const getSingleBlogDb = async (id: string) => {
    const result = await blogModel.findOne({ _id: id }).populate('author')
    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, "Blog not found")
    }
    return result
}
const updateSingleBlogDb = async (id: string, payload: blogInterface) => {
    const result = await blogModel.findOneAndUpdate({ _id: id }, payload, { new: true })
    return result
}
const deleteSingleBlogDb = async (id: string) => {
    const result = await blogModel.findOneAndDelete({ _id: id })
    return result
}

export const blogServices = {
    createBlogIntoDb,
    getAllBlogDb,
    getSingleBlogDb,
    updateSingleBlogDb,
    deleteSingleBlogDb
}