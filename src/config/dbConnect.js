import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config()

const CONN = process.env.CONN;
mongoose.connect(CONN);

let db = mongoose.connection;

export default db;