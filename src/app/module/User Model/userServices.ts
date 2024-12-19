import { loginInterface, userInterface } from "./user.Interface"
import { userModel } from "./userSchema.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const resgisterUserIntoDb = async (paylod: userInterface) => {
    const result = await userModel.create(paylod)
    return result
}

const loginUserDb = async (paylod: loginInterface) => {
    const user = await userModel.findOne({ email: paylod.email }).select("+password")

    if (!user) {
        throw new Error('This user is not found !')
    }

    const userStatus = user?.isBlocked
    if (userStatus) {
        throw new Error('User is already blocked!')
    }

    const isPassMatched = await bcrypt.compare(paylod?.password, user?.password)
    if (!isPassMatched) {
        throw new Error('Wrong Password!')
    }

    const jwtPayload = {
        email: user?.email,
        role: user?.role,
    }
    const token = jwt.sign(jwtPayload, "secreate1254hajibi", { expiresIn: '1d' })


    return { token };
}
export const userServices = {
    resgisterUserIntoDb,
    loginUserDb
}