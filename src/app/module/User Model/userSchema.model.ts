import { model, Schema } from "mongoose";
import { userInterface } from "./user.Interface";
import bcrypt from 'bcrypt'

const userSchema = new Schema<userInterface>({
    name: {
        type: String,
        required: [true, 'Name field is required.']
    },
    email: {
        type: String,
        required: [true, 'Email field is required.']
    },
    password: {
        type: String,
        required: [true, 'Password field is required.'],
        select: false
    },
    role: {
        type: String,
        enum: ["admin" , "user"],
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function(next){
    const user = this;
    user.password = await bcrypt.hash(user.password, 10)
    next()
})

userSchema.post('save', async function(doc, next){
    doc.password = ''
    next()
})

export const userModel = model<userInterface>('User', userSchema)