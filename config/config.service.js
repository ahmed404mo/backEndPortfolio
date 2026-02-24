import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

dotenvConfig({ path: resolve("./config/.env.dev") });


export const DB_URI = process.env.DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const EMAIL = process.env.EMAIL;
export const PASSWORD = process.env.PASSWORD;
export const SALT_ROUND = parseInt(process.env.SALT_ROUND ?? '10')
export const PORT = parseInt(process.env.PORT ?? '3000')

export const GMAIL_USER = process.env.GMAIL_USER;
export const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;