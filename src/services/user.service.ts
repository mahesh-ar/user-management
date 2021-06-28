import { TokenValidateResponse, UserInfo, LoginCredentials } from '../interfaces/userData.interface'
import { handleError } from '../util/error'
import UserDao from '../dao/user.dao'
import { encryptText, decryptText } from '../util/crypto'
import JWTAuthentication from '../util/jwt_token'
import { Logger } from '../util/logger'

export default class UserServices {

    public static registerUser = async (body: UserInfo) => {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info(`Inside User registration for: ${body.email}`)
                const resp: UserInfo = await UserDao.createUser({
                    email: body.email,
                    name: body.name,
                    mobile: body.mobile,
                    password: encryptText(body.password)
                })
                const tokens = await JWTAuthentication.generateToken(resp.email)
                Logger.debug(`User registration successful for: ${body.email}`)
                resolve({ user: body.email, ...tokens })
            } catch (error) {
                Logger.error(`Error in User registration for: ${body.email}`, error)
                reject(handleError(error))
            }
        })
    }
    public static primaryAuthentication = async (body: LoginCredentials) => {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info(`Inside login for ${body.email}`)
                const user: UserInfo = await UserDao.fetchByEmail(body.email)
                console.log(' user = ', user)
                if (user) {
                    const dbPassword = decryptText(user.password)
                    if (dbPassword === body.password) {
                        const tokens = await JWTAuthentication.generateToken(user.email)
                        Logger.debug(`User login success for ${body.email}`)
                        resolve({ user: body.email, ...tokens })
                    } else {
                        throw {
                            statusCode: 401,
                            name: 'UNAUTHORIZED',
                            message: 'User credentials are wrong'
                        }
                    }
                } else {
                    throw {
                            statusCode: 401,
                            name: 'UNAUTHORIZED',
                            message: 'User not found'
                        }
                }
            } catch (error) {
                console.log(`error in primary authentication(login) for ${body.email}`, error)
                reject(handleError(error))
            }
        })
    }
    public static accessTokenValidation = async (auth: string): Promise<TokenValidateResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info('Inside validating access token')
                const resp = await JWTAuthentication.verifyJwtToken(auth)
                Logger.info('success valid token')
                resolve(resp)
            } catch (error) {
                Logger.error('Error in validating access token ', error, null, { auth })
                reject(handleError(error))
            }
        })
    }
    public static updateUser = async (userEmail: string, body) => {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info(`Inside updateUser for ${userEmail}`)
                const resp = await UserDao.updateUser(userEmail, body)
                Logger.debug(`Update user deatils success for ${userEmail}`, resp)
                resolve(resp)
            } catch (error) {
                Logger.error(`Error in updating user deatils for ${userEmail}`, error, null, body)
                reject(handleError(error))
            }
        })
    }
    public static getUsers = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info('Inside getUsers')
                const resp = await UserDao.fetchUsers()
                Logger.debug('response getUsers', resp)
                resolve(resp)
            } catch (error) {
                Logger.error('Error in getUsers', error)
                reject(handleError(error))
            }
        })
    }
}
