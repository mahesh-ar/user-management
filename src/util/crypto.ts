import * as Cryptr from 'cryptr'
const cryptr = new Cryptr('ThisIsVeryDangerousKey#45678')

export const encryptText = (str: string) => {
    return cryptr.encrypt(str)
}

export const decryptText = (cipher: string) => {
    return cryptr.decrypt(cipher)
}
