require("dotenv").config();
import express from "express";

const app = express();

app.use(`${process.env.APP_URI + process.env.APP_VERSION}/country`, require("./country.routes"));
app.use(`${process.env.APP_URI + process.env.APP_VERSION}/state`, require("./state.routes"));
app.use(`${process.env.APP_URI + process.env.APP_VERSION}/admin`, require("./admin.routes"));
app.use(`${process.env.APP_URI + process.env.APP_VERSION}/login`, require("./login.routes"));
app.use(`${process.env.APP_URI + process.env.APP_VERSION}/role`, require("./role.routes"));
app.use(`${process.env.APP_URI + process.env.APP_VERSION}/user`, require("./user.routes"));

export default app;
