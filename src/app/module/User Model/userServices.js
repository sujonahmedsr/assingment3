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
exports.userServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const userSchema_model_1 = require("./userSchema.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const resgisterUserIntoDb = (paylod) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userSchema_model_1.userModel.create(paylod);
    return result;
});
const loginUserDb = (paylod) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSchema_model_1.userModel.findOne({ email: paylod.email }).select("+password");
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'This user is not found !');
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (userStatus) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'User is already blocked!');
    }
    const isPassMatched = yield bcrypt_1.default.compare(paylod === null || paylod === void 0 ? void 0 : paylod.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPassMatched) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Wrong Password!!! Tell me who are you? 😈');
    }
    const jwtPayload = {
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
        id: user === null || user === void 0 ? void 0 : user._id
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, process.env.SECRET_JWT, { expiresIn: '1d' });
    return { token };
});
exports.userServices = {
    resgisterUserIntoDb,
    loginUserDb
};
