import { Logger } from './logger'
import config from '../../config/config'
import { AuthToken, PayLoad, TokenValidateResponse } from '../interfaces/userData.interface'
import * as jwt from 'jsonwebtoken'

export default class JWTAuthentication {

    public static generateToken = (email: string): Promise<AuthToken> => {
        return new Promise((resolve, reject) => {
            try {
                const payload = { email }
                const accessToken = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
                    expiresIn: config.ACCESS_TOKEN_LIFE
                })
                const refreshToken = jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {
                    expiresIn: config.REFRESH_TOKEN_LIFE
                })
                resolve({ accessToken, refreshToken })
            } catch (error) {
                reject(error)
            }
        })
    }
    public static verifyJwtToken = (token: string): Promise<TokenValidateResponse> => {
        return new Promise((resolve, reject) => {
            try {
                const payload = jwt.verify(token, config.ACCESS_TOKEN_SECRET)
                resolve(payload as TokenValidateResponse)
            } catch (error) {
                Logger.error('Error while verifying token', error)
                reject(error)
            }
        })
    }
}
