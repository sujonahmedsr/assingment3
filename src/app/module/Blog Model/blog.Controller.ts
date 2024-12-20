import { Request, Response } from "express"
import { blogServices } from "./blog.Services"
import { StatusCodes } from "http-status-codes"
import sendResponse from "../../utils/sendRespose"
import asyncFunc from "../../utils/asyncFunc"

// create a blog 
const createBlog = asyncFunc(async (req: Request, res: Response) => {
    const body = req.body
    const result = await blogServices.createBlogIntoDb(body)
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Blog created successfully',
        data: result
    })
})

// get all blogs 
const getAllBlog = asyncFunc(async (req: Request, res: Response) => {
    const result = await blogServices.getAllBlogDb(req.query)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Blogs fetched successfully',
        data: result
    })
})

// get single blogs 
const getSingleBlog = asyncFunc(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await blogServices.getSingleBlogDb(id)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Single blog fetched successfully',
        data: result
    })
})

// update a blog 
const updateSingleBlog = asyncFunc(async (req: Request, res: Response) => {
    const { id } = req.params
    const payload = req.body
    const result = await blogServices.updateSingleBlogDb(id, payload)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Blog updated successfully',
        data: result
    })
})

// delete a blog  
const deleteSingleBlog = asyncFunc(async (req: Request, res: Response) => {
    const { id } = req.params
    await blogServices.deleteSingleBlogDb(id)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Blog deleted successfully',
    })
})

// export all function 
export const blogController = {
    createBlog,
    getAllBlog,
    getSingleBlog,
    updateSingleBlog,
    deleteSingleBlog
}