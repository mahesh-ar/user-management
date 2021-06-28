import { Logger } from '../util/logger'
import {  UserInfo } from '../interfaces/userData.interface'
import { userModel } from '../models/user.model'

export default class UserDao {

   public static createUser = (custInfo: UserInfo): Promise<UserInfo> => {
        return new Promise(async (resolve, reject) => {
            try {
                const newUser: any = await userModel.create(custInfo)
                Logger.info(`User created Successfull: ${custInfo.email}`)
                resolve(newUser)
            } catch (error) {
                Logger.error('Error while inserting new user', error, null, null)
                if (error.code === 11000) {
                    reject({
                        statusCode: 409,
                        name: 'USER_EXISTS',
                        message: `User with Email: ${custInfo.email} already exists`
                    })
                } else {
                    Logger.error('Error on create user', error)
                    reject(error)
                }
            }
        })
    }

   public static updateUser = (email: string, userInfo: UserInfo): Promise<any[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(' update user : ', email, userInfo)
                const resp: any = await userModel.findOneAndUpdate({ email }, userInfo, { projection: { password: 0, __v: 0, _id: 0 }, new: true }).exec()
                Logger.info(`Response from updateUser ${resp}`, null, null, resp)
                resolve(resp)
            } catch (error) {
                Logger.error('Error while updateUser ', error, null, null)
                reject(error)
            }
        })
    }
   public static fetchUsers = (): Promise<[UserInfo]> => {
        return new Promise(async (resolve, reject) => {
            try {
                const users: any = await userModel.find({}, { password: 0, __v: 0, _id: 0 }).exec()
                Logger.info('Response from fetchUsers', null, null, users)
                resolve(users)
            } catch (error) {
                Logger.error('Error while fetching users', error, null, null)
                reject(error)
            }
        })
    }
    public static fetchByEmail = (email): Promise<UserInfo> => {
        return new Promise(async (resolve, reject) => {
            try {
                const users: any = await userModel.findOne({ email }).exec()
                Logger.info('Response from fetchByEmail', null, null, users)
                resolve(users)
            } catch (error) {
                Logger.error('Error while fetchByEmail method', error, null, null)
                reject(error)
            }
        })
    }
}
