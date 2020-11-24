import mongoose from "mongoose";
require("dotenv").config();

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const nameLocalDb = process.env.NAME_LOCAL_BD;
const nameRemoteDb =  process.env.NAME_REMOTE_DB;
const usernameRemoteDb =  process.env.USERNAME_REMOTE_DB;
const passwordRemoteDb =  process.env.PASSWORD_REMOTE_DB;
const dbName = nameLocalDb ? nameLocalDb : nameRemoteDb;
const connectionString = (nameLocalDb) ? `mongodb://${dbHost}:${dbPort}/${nameLocalDb}` : `mongodb+srv://${usernameRemoteDb}:${passwordRemoteDb}@cluster0.7stuv.mongodb.net/${nameRemoteDb}?retryWrites=true&w=majority`;


module.exports = {
  connect: () => mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }),
  dbName,
  connectionString,
  connection: () => {
    if (mongoose.connection) {
      return mongoose.connection;
    }

    return this.connect();
  }
};
