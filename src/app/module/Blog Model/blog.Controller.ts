import { Request, Response } from "express"
import { blogServices } from "./blog.Services"
import { StatusCodes } from "http-status-codes"
import sendResponse from "../../utils/sendRespose"
import asyncFunc from "../../utils/asyncFunc"
import { blogInterface } from "./blog.Interface"
import AppError from "../../errors/AppError"
import { blogModel } from "./blog.Model.Schema"

// create a blog 
const createBlog = asyncFunc(async (req: Request, res: Response) => {
    if(!req?.user){
        throw new AppError (StatusCodes.BAD_GATEWAY,"You must be logged in to create a blog.")
    }
    const { title, content } = req.body

    const payload: blogInterface = { title, content, author: req?.user.id, isPublished: true }

    const result = await blogServices.createBlogIntoDb(payload)
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Blog created successfully',
        data: {
            _id: result?._id,
            title: result?.title,
            content: result?.content,
            author: result?.author
        }
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
    const userId = req?.user?.id
    
    const blog = await blogModel.findOne({_id: id})

    console.log(blog?.author, userId);
    

    if(!blog){
        throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found')
    }

    if(blog.author.toString() !== userId){
        throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized to update this blog")
    }

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
    const userId = req?.user?.id
    
    const blog = await blogModel.findOne({_id: id})

    if(!blog){
        throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found')
    }

    if(blog.author.toString() !== userId){
        throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized to delete this blog")
    }

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