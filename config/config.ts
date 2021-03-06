const dotenv = require('dotenv')
dotenv.config()

const _PORT = process.env.PORT || 4002

const _ERROR_SOURCE = 'User Management'
const _MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const ACCESS_TOKEN_LIFE = 3600 // process.env.ACCESS_TOKEN_LIFE
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
const REFRESH_TOKEN_LIFE = 86400 // process.env.REFRESH_TOKEN_LIFE

export default {
    ACCESS_TOKEN_LIFE,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_LIFE,
    PORT: _PORT,
    ERROR_SOURCE: _ERROR_SOURCE,
    MONGODB_CONNECTION_STRING: _MONGODB_CONNECTION_STRING
}
