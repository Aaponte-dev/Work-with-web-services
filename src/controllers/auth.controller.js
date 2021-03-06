import log4js from "log4js";
import jwt from "jsonwebtoken";
import secrets from "../config/secrets";
import {
    isActive,
    serviceLogin,
    responseWithJWT,
    serviceSetPassword,
    serviceGetUserById,
    serviceGetUserByEmail,
    existsResetPasswordToken
} from "../services/user.service";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import { serviceSendEmailToPasswordChange } from "../services/nodeMailer.service";

const logger = log4js.getLogger();
logger.level = "debug";

async function login(req, res) {
    console.log("\n");
    logger.info("[login] INIT");
    try {

        const emailString = req.body.email;
        const unencryptedPasswordString = req.body.password;
        let user = await serviceGetUserByEmail(emailString.toLowerCase());
        if (!user) {
            logger.info("[login] FINISH");
            return ResponseUtil.unauthorized(res, errors.UNAUTHORIZED, errors.UNAUTHORIZED_MESSAGE);
        }
        user = await serviceLogin(user, unencryptedPasswordString);
        if (user) {
            responseWithJWT(res, user);
        } else {
            ResponseUtil.unauthorized(res, errors.UNAUTHORIZED, errors.UNAUTHORIZED_MESSAGE);
        }

    } catch (error) {

        logger.error("[login] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }
    logger.info("[login] FINISH");
}

async function sendEmailToChangePassword(req, resp) {
    console.log("\n");
    logger.info("[sendEmailToChangePassword] INIT");
    try {

        const EMAIL = req.body.email;
        let user = await serviceGetUserByEmail(EMAIL);
        user.resetPasswordToken = jwt.sign({id: user._id}, secrets.jwtResetPasswordSecret, {expiresIn: "10m"});
        const TOKEN = user.resetPasswordToken;
        await user.save();
        await serviceSendEmailToPasswordChange(EMAIL, TOKEN);
        ResponseUtil.success(resp, "success");

    } catch (error) {

        logger.error("[sendEmailToChangePassword] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }
    logger.info("[sendEmailToChangePassword] FINISH");
}

async function resetPassword(req, res) {
    console.log("\n");
    logger.info("[resetPassword] INIT");
    try {

        const password = req.body.password;
        const resetPasswordToken = req.headers["authorization"].replace("Bearer ", "");
        const resetPasswordTokenValidator = await existsResetPasswordToken(resetPasswordToken);
        const user = await serviceGetUserById(req.user.id);
        if (resetPasswordTokenValidator && isActive(user)) {
            await serviceSetPassword(user._id, password);
            user.password = undefined;
            user.registerToken = undefined;
            user.resetPasswordToken = undefined;

            responseWithJWT(res, user);
        } else {
            ResponseUtil.forbidden(res, errors.FORBIDDEN, errors.FORBIDDEN_MESSAGE);
        }

    } catch (error) {

        logger.error("[resetPassword] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }
    logger.info("[resetPassword] FINISH");
}

export {
    login,
    resetPassword,
    sendEmailToChangePassword
};
