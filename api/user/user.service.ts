import { genericService } from "../../services/generic.service"
import { loggerService } from "../../services/logger.service"
import type { Miniuser, User } from "../../model/user.model"
import { ObjectId } from "mongodb"



const COLLECTION: string = 'user'

const genericUserService = genericService(COLLECTION)

export const userService = {
    add: (user: User) => genericUserService.add(user),
    update: (user: User) => genericUserService.update(user),
    remove: (userId: string) => genericUserService.remove(userId),
    getByUsername,
    getById
}

async function getByUsername(username: string): Promise<User | null> {
    try {
        const criteria = { username:username }
        let users = await genericUserService.query(criteria);
        if (!users || Array.isArray(users) && users.length === 0) return null
        return users[0] as User
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
    const mini = {
        _id: user._id,
        fullname: user.fullname,
        username: user.username
    }
    return mini
}