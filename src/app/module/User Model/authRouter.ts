import { Router } from "express";
import { userController } from "./userController";

const authRouter = Router()

authRouter.post('/register', userController.registerUser)
authRouter.post('/login', userController.loginUser)

export default authRouter