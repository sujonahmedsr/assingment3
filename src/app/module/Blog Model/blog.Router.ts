import { Router } from "express";
import { blogController } from "./blog.Controller";
import authMid from "../Authentication/authMid";

const blogRouter = Router()

blogRouter.post('/', authMid('user'), blogController.createBlog)
blogRouter.get('/', blogController.getAllBlog)
blogRouter.get('/:id', authMid('user'), blogController.getSingleBlog)
blogRouter.patch('/:id', authMid('user'), blogController.updateSingleBlog)
blogRouter.delete('/:id', authMid('user'), blogController.deleteSingleBlog)

export default blogRouter