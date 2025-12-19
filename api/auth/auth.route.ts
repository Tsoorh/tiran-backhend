import express from "express";
import { getLoginToken, loginCont, logoutCont, registerCont } from "./auth.controller";


const routes = express.Router()

routes.post("/login", loginCont)
routes.post("/logout", logoutCont)
routes.post("/register", registerCont)
routes.post("/refresh-token", getLoginToken)


export const authRoutes = routes