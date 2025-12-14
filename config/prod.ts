
// for checking prod 
import { Config } from '.';
import dotenv from 'dotenv';
dotenv.config();


export default {
    dbURL:process.env.MONGO_URL,
    dbName:process.env.DB_NAME 
} as Config


// export default {
//     dbURL: process.env.MONGO_URL || 'mongodb+srv://{USERNAME}:{PASSWORD}@cluster0.6qm6pd1.mongodb.net/',
//     dbName: process.env.DB_NAME || 'bug_db'
// }


// !!!!!for production!!!!!
// export default {
//     dbURL: process.env.MONGO_URL,
//     dbName: process.env.DB_NAME '
// }
