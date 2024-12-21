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
exports.adminController = void 0;
const asyncFunc_1 = __importDefault(require("../../utils/asyncFunc"));
const sendRespose_1 = __importDefault(require("../../utils/sendRespose"));
const http_status_codes_1 = require("http-status-codes");
const adminServices_1 = require("./adminServices");
const userBlockedByAdmin = (0, asyncFunc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const body = req.body;
    yield adminServices_1.adminServices.blockUserDb(userId, body);
    (0, sendRespose_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'User blocked successfully'
    });
}));
const deleteBlogAdmin = (0, asyncFunc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield adminServices_1.adminServices.deleteBlogAdminDb(id);
    (0, sendRespose_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Blog deleted successfully'
    });
}));
exports.adminController = {
    userBlockedByAdmin,
    deleteBlogAdmin
};
