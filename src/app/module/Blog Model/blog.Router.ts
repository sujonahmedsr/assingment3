import { Router } from "express";
import { blogController } from "./blog.Controller";
import authMid from "../Authentication/authMid";
import validateRequest from "../../middlewares/validateRequest";
import { blogValidation } from "./blogValidation";

const blogRouter = Router()

blogRouter.post('/', validateRequest(blogValidation.blogValidationSchema), authMid('user'), blogController.createBlog)
blogRouter.get('/', blogController.getAllBlog)
blogRouter.get('/:id', authMid('user'), blogController.getSingleBlog)
blogRouter.patch('/:id', validateRequest(blogValidation.updateBlogValidationSchema), authMid('user'), blogController.updateSingleBlog)
blogRouter.delete('/:id', authMid('user'), blogController.deleteSingleBlog)

export default blogRouter