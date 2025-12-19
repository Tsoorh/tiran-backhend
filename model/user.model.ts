import { ObjectId } from "mongodb"

export type Miniuser = {
    _id?: ObjectId
    fullname: string
    username: string
}

export type User = Miniuser & {
    password: string
    isAdmin?: boolean
}

export type UserIdParams = {
    userId: string
}
export type UsernameParams = {
    username: string
}

export type UserInBody = {
    body: {
        user: User
    }
}