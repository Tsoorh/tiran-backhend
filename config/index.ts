import configProd from "./prod.js"
import configDev from "./dev.js"

import dotenv from 'dotenv';
dotenv.config();

export type Config = {
    dbURL:string
    dbName:string
}

export var config : Config

if (process.env.NODE_ENV === "production") {
    config = configProd
} else {
    config = configDev
}

