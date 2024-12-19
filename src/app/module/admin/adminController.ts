import { Request, Response } from "express"
import asyncFunc from "../../utils/asyncFunc"
import sendResponse from "../../utils/sendRespose"
import { StatusCodes } from "http-status-codes"
import { adminServices } from "./adminServices"



const deleteBlogAdmin = asyncFunc(async (req: Request, res: Response) => {
    const {id} = req.params
    await adminServices.deleteBlogAdminDb(id)
    sendResponse(res,{
        statusCode: StatusCodes.OK,
        message: 'Blog deleted successfully'
    })
})
export const adminController = {
    deleteBlogAdmin
}