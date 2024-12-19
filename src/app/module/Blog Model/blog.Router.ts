import { Router } from "express";
import { blogController } from "./blog.Controller";

const blogRouter = Router()

blogRouter.post('/', blogController.createBlog)
blogRouter.get('/', blogController.getAllBlog)
blogRouter.get('/:id', blogController.getSingleBlog)
blogRouter.patch('/:id', blogController.updateSingleBlog)
blogRouter.delete('/:id', blogController.deleteSingleBlog)

export default blogRouter