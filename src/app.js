"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const blog_Router_1 = __importDefault(require("./app/module/Blog Model/blog.Router"));
const authRouter_1 = __importDefault(require("./app/module/User Model/authRouter"));
const globalErrorHandling_1 = __importDefault(require("./app/middlewares/globalErrorHandling"));
const adminRouter_1 = __importDefault(require("./app/module/admin/adminRouter"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// api end points 
app.use('/api/auth', authRouter_1.default);
app.use('/api/blogs', blog_Router_1.default);
app.use('/api/admin', adminRouter_1.default);
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'Server Live ⚡',
    });
});
// global error handler 
app.use(globalErrorHandling_1.default);
app.use("*", (req, res) => {
    res.status(404).json({
        status: false,
        message: 'Route not found'
    });
});
exports.default = app;
