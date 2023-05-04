import mongoose from "mongoose";

mongoose.connect(process.env.CONEXAO_DB);

let db = mongoose.connection;

export default db;