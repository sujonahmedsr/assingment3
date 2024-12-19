import { NextFunction, Request, Response } from "express"
import asyncFunc from "../../utils/asyncFunc"
import jwt, { JwtPayload } from "jsonwebtoken"
import { userModel } from "../User Model/userSchema.model"

const authMid = (...requiredRole: string[]) => {
    return asyncFunc(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization
        if (!token) {
            throw new Error("You are not authorized")
        }
        const decoded = jwt.verify(token, 'secreate1254hajibi') as JwtPayload

        const { email, role } = decoded

        const user = await userModel.findOne({ email })
        if (!user) {
            throw new Error("This user is not found !")
        }

        const userStatus = user?.isBlocked

        if (userStatus) {
            throw new Error('This user is blocked ! !')
        }

        if (requiredRole && !requiredRole.includes(role)) {
            throw new Error('You are not authorized');
        }

        req.user = decoded as JwtPayload;

        next();
    })
}
export default authMid