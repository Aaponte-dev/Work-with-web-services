import express from "express";
import jwtMiddleware from "express-jwt";
import validatorLogin from "../middlewares/validatorLogin";
import {
    login,
    resetPassword,
    sendEmailToChangePassword
} from "../controllers/auth.controller";
import secrets from "../config/secrets";

const router = express.Router();

router.route("/")
    .post(validatorLogin, login);

router.route("/reset-password")
    .put(jwtMiddleware({secret: secrets.jwtResetPasswordSecret}), resetPassword);

router.route("/send-email")
    .put(sendEmailToChangePassword);

module.exports = router;