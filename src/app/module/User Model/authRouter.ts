import { Router } from "express";
import { userController } from "./userController";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./userValidation";

const authRouter = Router()

authRouter.post('/register', validateRequest(userValidation.userValidationSchema), userController.registerUser)
authRouter.post('/login', validateRequest(userValidation.userLoginValidation), userController.loginUser)

export default authRouter