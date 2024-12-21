"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const userValidationSchema = zod_1.default.object({
    name: zod_1.default.string({ required_error: "Name must be provided and must be a string" }),
    email: zod_1.default.string({ required_error: "Email must be provided and must be a string" }).email(),
    password: zod_1.default.string({ required_error: "Strong Password must be provided" })
});
const userLoginValidation = zod_1.default.object({
    email: zod_1.default.string({ required_error: "Email must be provided and must be a string" }).email(),
    password: zod_1.default.string({ required_error: "Strong Password must be provided" })
});
exports.userValidation = {
    userValidationSchema,
    userLoginValidation
};
