import { genericService } from "../../services/generic.service"
import { loggerService } from "../../services/logger.service"
import type { Miniuser, User } from "../../model/user.model"
import { ObjectId } from "mongodb"



const COLLECTION: string = 'user'

const genericUserService = genericService(COLLECTION)

export const userService = {
    add: genericUserService.add,
    update: genericUserService.update,
    remove: genericUserService.remove,
    getByUsername,
    getById
}

async function getByUsername(username: string): Promise<Miniuser | void | undefined> {
    try {
        const criteria = { username }
        let isUserExist = await genericUserService.query(criteria);
        if (!isUserExist) return
        const miniUser: Miniuser = {
            _id: isUserExist[0]._id,
            fullname: isUserExist[0].fullname,
            username: isUserExist[0].username
        }
        return miniUser
    } catch (err) {
        loggerService.error("Couldn't get user by username")
        throw err
    }
}
async function getById(userId: string): Promise<Miniuser | void | undefined> {
    try {
        const criteria = { _id: new ObjectId(userId) }
        let isUserExist = await genericUserService.query(criteria);
        if (!isUserExist) return
        const miniUser: Miniuser = convertUserToMiniUser(isUserExist[0] as User)
        return miniUser
    } catch (err) {
        loggerService.error("Couldn't get user by username")
        throw err
    }
}

export function convertUserToMiniUser(user: User): Miniuser {
    return {
        _id: user._id,
        fullname: user.fullname,
        username: user.username
    }
}