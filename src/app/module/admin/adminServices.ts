import { blogModel } from "../Blog Model/blog.Model.Schema"
import { userInterface } from "../User Model/user.Interface"
import { userModel } from "../User Model/userSchema.model"

const blockUserDb = async (id: string, payload: userInterface) => {
    
    const user = await userModel.findOne({ _id: id })

    if (!user) {
        throw new Error('User not found!')
    }

    let isBlocked = user?.isBlocked
    if (isBlocked) {
        throw new Error('This user already Blocked')
    }

    const result = await userModel.findOneAndUpdate({ _id: id }, { ...payload, isBlocked: true }, { new: true })

    return result
}


const deleteBlogAdminDb = async (id: string) => {
    const result = await blogModel.findOneAndDelete({ _id: id })
    return result
}
export const adminServices = {
    deleteBlogAdminDb,
    blockUserDb
}