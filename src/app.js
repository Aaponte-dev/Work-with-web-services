// app nodejs
import cors from "cors";
import log4js from "log4js";
import morgan from "morgan";
import express from "express";
import routes from "./routes";
import db from "./config/database";
import errorHandlingJWT from "./middlewares/errorHandlingJWT";

const logger = log4js.getLogger();
logger.level = "debug";

db.connect()
  .then(() => logger.info("Connected to MongoDB..."))
  .catch(err => logger.error("Could not connect to MongoDB...", err));

// Server express
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors({
  exposedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Accept-Language", "Authorization"],
}));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(routes);
app.use(errorHandlingJWT);

export default app;
