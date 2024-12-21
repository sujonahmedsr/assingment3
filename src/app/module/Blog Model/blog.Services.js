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
exports.blogServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_Model_Schema_1 = require("./blog.Model.Schema");
const createBlogIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_Model_Schema_1.blogModel.create(payload);
    return result;
});
const getAllBlogDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, query);
    const excludedItem = ["search", "filter", "sortBy", "sortOrder"];
    excludedItem.forEach(key => delete queryObj[key]);
    // search 
    let search = (query === null || query === void 0 ? void 0 : query.search) || '';
    const serachQuery = blog_Model_Schema_1.blogModel.find({
        $or: ['title', 'content'].map(field => ({
            [field]: { $regex: search, $options: 'i' }
        }))
    });
    // filter query
    const filterQuery = serachQuery.find(queryObj);
    // sortBy and sortOrder 
    let sortStr = 'createdAt';
    if ((query === null || query === void 0 ? void 0 : query.sortBy) && (query === null || query === void 0 ? void 0 : query.sortOrder)) {
        const sortBy = query.sortBy;
        const sortOrder = query.sortOrder;
        sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
    }
    const sortBy = filterQuery.sort(sortStr);
    const result = yield sortBy.find().populate('author');
    return result;
});
const getSingleBlogDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_Model_Schema_1.blogModel.findOne({ _id: id }).populate('author');
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Blog not found");
    }
    return result;
});
const updateSingleBlogDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_Model_Schema_1.blogModel.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
});
const deleteSingleBlogDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_Model_Schema_1.blogModel.findOneAndDelete({ _id: id });
    return result;
});
exports.blogServices = {
    createBlogIntoDb,
    getAllBlogDb,
    getSingleBlogDb,
    updateSingleBlogDb,
    deleteSingleBlogDb
};
