"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogController = void 0;
const blog_Services_1 = require("./blog.Services");
const http_status_codes_1 = require("http-status-codes");
const sendRespose_1 = __importDefault(require("../../utils/sendRespose"));
const asyncFunc_1 = __importDefault(require("../../utils/asyncFunc"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_Model_Schema_1 = require("./blog.Model.Schema");
// create a blog 
const createBlog = (0, asyncFunc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(req === null || req === void 0 ? void 0 : req.user)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_GATEWAY, "You must be logged in to create a blog.");
    }
    const { title, content } = req.body;
    const payload = { title, content, author: req === null || req === void 0 ? void 0 : req.user.id, isPublished: true };
    const result = yield blog_Services_1.blogServices.createBlogIntoDb(payload);
    (0, sendRespose_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: 'Blog created successfully',
        data: result
    });
}));
// get all blogs 
const getAllBlog = (0, asyncFunc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_Services_1.blogServices.getAllBlogDb(req.query);
    (0, sendRespose_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Blogs fetched successfully',
        data: result
    });
}));
// get single blogs 
const getSingleBlog = (0, asyncFunc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_Services_1.blogServices.getSingleBlogDb(id);
    (0, sendRespose_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Single blog fetched successfully',
        data: result
    });
}));
// update a blog 
const updateSingleBlog = (0, asyncFunc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
    const blog = yield blog_Model_Schema_1.blogModel.findOne({ _id: id });
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found');
    }
    if (blog.author.toString() !== userId) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not authorized to update this blog");
    }
    const payload = req.body;
    const result = yield blog_Services_1.blogServices.updateSingleBlogDb(id, payload);
    (0, sendRespose_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Blog updated successfully',
        data: result
    });
}));
// delete a blog  
const deleteSingleBlog = (0, asyncFunc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
    const blog = yield blog_Model_Schema_1.blogModel.findOne({ _id: id });
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found');
    }
    if (blog.author.toString() !== userId) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not authorized to delete this blog");
    }
    yield blog_Services_1.blogServices.deleteSingleBlogDb(id);
    (0, sendRespose_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Blog deleted successfully',
    });
}));
// export all function 
exports.blogController = {
    createBlog,
    getAllBlog,
    getSingleBlog,
    updateSingleBlog,
    deleteSingleBlog
};
