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
exports.userController = void 0;
const asyncFunc_1 = __importDefault(require("../../utils/asyncFunc"));
const userServices_1 = require("./userServices");
const sendRespose_1 = __importDefault(require("../../utils/sendRespose"));
const http_status_codes_1 = require("http-status-codes");
const registerUser = (0, asyncFunc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield userServices_1.userServices.resgisterUserIntoDb(body);
    (0, sendRespose_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: 'User registered successfully',
        data: result
    });
}));
const loginUser = (0, asyncFunc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield userServices_1.userServices.loginUserDb(body);
    (0, sendRespose_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Login successful',
        data: result
    });
}));
exports.userController = {
    registerUser,
    loginUser
};
