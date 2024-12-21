"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMid_1 = __importDefault(require("../Authentication/authMid"));
const adminController_1 = require("./adminController");
const adminRouter = (0, express_1.Router)();
adminRouter.patch('/users/:userId/block', (0, authMid_1.default)('admin'), adminController_1.adminController.userBlockedByAdmin);
adminRouter.delete('/blogs/:id', (0, authMid_1.default)('admin'), adminController_1.adminController.deleteBlogAdmin);
exports.default = adminRouter;
