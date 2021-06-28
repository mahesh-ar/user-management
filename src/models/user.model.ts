import { Schema, model } from 'mongoose'
import { USER_COLLECTION_NAME } from '../constants/generalConstants'
import { UserInfo } from '../interfaces/userData.interface'

const customerSchema = new Schema<UserInfo>({
    name: { type: String },
    mobile: { type: Number },
    email: { type: String, index: true, unique: true },
    password: { type: String }
})

export const userModel = model(USER_COLLECTION_NAME, customerSchema, USER_COLLECTION_NAME)
