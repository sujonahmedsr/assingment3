"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_Controller_1 = require("./blog.Controller");
const authMid_1 = __importDefault(require("../Authentication/authMid"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blogValidation_1 = require("./blogValidation");
const blogRouter = (0, express_1.Router)();
blogRouter.post('/', (0, validateRequest_1.default)(blogValidation_1.blogValidation.blogValidationSchema), (0, authMid_1.default)('user'), blog_Controller_1.blogController.createBlog);
blogRouter.get('/', blog_Controller_1.blogController.getAllBlog);
blogRouter.get('/:id', blog_Controller_1.blogController.getSingleBlog);
blogRouter.patch('/:id', (0, validateRequest_1.default)(blogValidation_1.blogValidation.updateBlogValidationSchema), (0, authMid_1.default)('user'), blog_Controller_1.blogController.updateSingleBlog);
blogRouter.delete('/:id', (0, authMid_1.default)('user'), blog_Controller_1.blogController.deleteSingleBlog);
exports.default = blogRouter;
