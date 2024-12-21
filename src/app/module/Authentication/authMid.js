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
const asyncFunc_1 = __importDefault(require("../../utils/asyncFunc"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_model_1 = require("../User Model/userSchema.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const authMid = (...requiredRole) => {
    return (0, asyncFunc_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authToken = req.headers.authorization;
        const token = authToken.split(" ")[1];
        if (token == 'undefined' || !token) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized");
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT);
        const { email, role, id } = decoded;
        const user = yield userSchema_model_1.userModel.findOne({ _id: id });
        if (!user) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "This user is not found !");
        }
        const userStatus = user === null || user === void 0 ? void 0 : user.isBlocked;
        if (userStatus) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'This user is blocked ! !');
        }
        if (requiredRole && !requiredRole.includes(role)) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are not authorized');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = authMid;
