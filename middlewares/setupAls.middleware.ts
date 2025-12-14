import { asyncLocalStorage } from "../services/als.service"
// import { authService } from "../api/auth/auth.service.js"
import type { NextFunction,Response,Request } from "express"
import type { AsyncLocalStorage } from "async_hooks"

type loggedinUser={
    _id:string,
    username:string,
    fullname:string
}

export function setupAsyncLocalStorage(req:Request, res:Response, next:NextFunction) {
    const storage = {}
    asyncLocalStorage.run(storage, () => {
        if (!req.cookies?.loginToken) return next()
        const loggedinUser = authService.validateToken(req.cookies.loginToken);

        if (loggedinUser) {
            const alsStore = asyncLocalStorage.getStore()
            alsStore.loggedinUser = loggedinUser
        }
        next();
    })

}