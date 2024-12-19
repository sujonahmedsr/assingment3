import { Router } from "express";
import authMid from "../Authentication/authMid";
import { adminController } from "./adminController";

const adminRouter = Router()

adminRouter.delete('/blogs/:id', authMid('admin'), adminController.deleteBlogAdmin)
adminRouter.delete('/users/:userId/block', authMid('admin'), adminController.deleteBlogAdmin)

export default adminRouter