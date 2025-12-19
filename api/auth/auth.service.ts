import { loggerService } from "../../services/logger.service"
import jwt from 'jsonwebtoken';
import { Miniuser,User } from "../../model/user.model";

const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY || 'Tiran_Lasry_SecretKEY'
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY || 'Tiran_Lasry_SecretKEY'



async function getLoginAccessToken(user: Miniuser) {
    return jwt.sign(user, ACCESS_TOKEN_KEY, { expiresIn: '15m' })
}

async function getLoginRefreshToken(user: Miniuser) {
    return jwt.sign(user, REFRESH_TOKEN_KEY, { expiresIn: '7d' })
}

async function validateToken(token: string) {
    try {
        return jwt.verify(token, ACCESS_TOKEN_KEY)
    } catch (err) {
        loggerService.error("Couldn't validate token", err)
        throw err
    }
}



async function login(username: string, password: string) {
    try {
    // const userDetails = await userService.getByUsername<User>(username);
    // const hash =

    } catch (err) {
        loggerService.error("Couldn't login", err)
        throw err
    }
}
async function register(user: User) {
    try {

    } catch (err) {
        loggerService.error("Couldn't register", err)
        throw err
    }
}

