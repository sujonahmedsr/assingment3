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
exports.adminServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_Model_Schema_1 = require("../Blog Model/blog.Model.Schema");
const userSchema_model_1 = require("../User Model/userSchema.model");
const blockUserDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSchema_model_1.userModel.findOne({ _id: id });
    // check if user still alive 😁
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found!');
    }
    // check if user already block 
    let isBlocked = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (isBlocked) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This user already Blocked');
    }
    const result = yield userSchema_model_1.userModel.findOneAndUpdate({ _id: id }, Object.assign(Object.assign({}, payload), { isBlocked: true }), { new: true });
    return result;
});
const deleteBlogAdminDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_Model_Schema_1.blogModel.findOne({ _id: id });
    // check if blog still alive 😁
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found!');
    }
    const result = yield blog_Model_Schema_1.blogModel.findOneAndDelete({ _id: id });
    return result;
});
exports.adminServices = {
    deleteBlogAdminDb,
    blockUserDb
};
