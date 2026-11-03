import dotenv from "dotenv"
dotenv.config()
class Config {
    constructor() {
        return {

            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "jelszo",
            database: process.env.DB_NAME || "webshop"
        }
    }
}

const config = new Config()
export default config