import { Request, Response } from "express"
import asyncFunc from "../../utils/asyncFunc"
import sendResponse from "../../utils/sendRespose"
import { StatusCodes } from "http-status-codes"
import { adminServices } from "./adminServices"

const userBlockedByAdmin = asyncFunc(async (req: Request, res: Response) => {
    const { userId } = req.params
    const body = req.body

    await adminServices.blockUserDb(userId, body)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'User blocked successfully'
    })
})

const deleteBlogAdmin = asyncFunc(async (req: Request, res: Response) => {
    const { id } = req.params
    await adminServices.deleteBlogAdminDb(id)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Blog deleted successfully'
    })
})
export const adminController = {
    userBlockedByAdmin,
    deleteBlogAdmin
}