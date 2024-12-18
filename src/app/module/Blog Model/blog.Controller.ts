import { Request, Response } from "express"
import { blogServices } from "./blog.Services"
import { StatusCodes } from "http-status-codes"

const createBlog = async (req: Request, res: Response) => {
    const body = req.body
    const result = await blogServices.createBlogIntoDb(body)
    return {
        success: true,
        message: "Blog created successfully",
        statusCode: StatusCodes.CREATED,
        data: result
      }
}

const getAllBlog = async (req: Request, res: Response) => {
    const result = await blogServices.getAllBlogDb()
    return {
        success: true,
        message: "Blogs fetched successfully",
        statusCode: StatusCodes.OK,
        data: result
      }
}

const getSingleBlog = async (req: Request, res: Response) => {
    const {id} = req.params
    const result = await blogServices.getSingleBlogDb(id)
    return {
        success: true,
        message: "Single blog fetched successfully",
        statusCode: StatusCodes.OK,
        data: result
      }
}
const updateSingleBlog = async (req: Request, res: Response) => {
    const {id} = req.params
    const payload = req.body
    const result = await blogServices.updateSingleBlogDb(id, payload)
    return {
        success: true,
        message: "Blog updated successfully",
        statusCode: StatusCodes.OK,
        data: result
      }
}
const deleteSingleBlog = async (req: Request, res: Response) => {
    const {id} = req.params
    const result = await blogServices.deleteSingleBlogDb(id)
    return {
        success: true,
        message: "Blog deleted successfully",
        statusCode: StatusCodes.OK,
        data: result
      }
}


export const blogController = {
    createBlog,
    getAllBlog,
    getSingleBlog,
    updateSingleBlog,
    deleteSingleBlog
}