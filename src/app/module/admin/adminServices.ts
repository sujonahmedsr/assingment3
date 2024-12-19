import { blogModel } from "../Blog Model/blog.Model.Schema"

const deleteBlogAdminDb = async(id: string) => {
    const result = await blogModel.findOneAndDelete({_id: id})
    return result
}
export const adminServices = {
    deleteBlogAdminDb
}