import express from "express";
import jwtMiddleware from "express-jwt";
import validatorLogin from "../middlewares/validatorLogin";
import {
    login,
    verify,
    resetPassword
} from "../controllers/auth.controller";
import secrets from "../config/secrets";

const router = express.Router();

router.route("/")
    .post(validatorLogin, login);

router.route("/verify")
    .post(verify);

router.route("/reset-password")
    .post(jwtMiddleware({secret: secrets.jwtRegisterSecret}), resetPassword);

module.exports = router;