"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("./userController");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const userValidation_1 = require("./userValidation");
const authRouter = (0, express_1.Router)();
authRouter.post('/register', (0, validateRequest_1.default)(userValidation_1.userValidation.userValidationSchema), userController_1.userController.registerUser);
authRouter.post('/login', (0, validateRequest_1.default)(userValidation_1.userValidation.userLoginValidation), userController_1.userController.loginUser);
exports.default = authRouter;
