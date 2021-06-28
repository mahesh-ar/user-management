import { ObjectID } from 'bson'

export interface UserInfo {
    name: string
    mobile: number
    email: string
    password: string
}

export interface LoginCredentials {
    email: string
    password: string
}

export interface AuthToken {
    accessToken: string
    refreshToken: string
}
export interface PayLoad {
    accessToken: string
    refreshToken: string
}

export interface TokenValidateResponse {
    email: string
    iat: number,
    exp: number
}
