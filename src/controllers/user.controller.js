import log4js from "log4js";
import jwt from "jsonwebtoken";
import {
    serviceGetAllUser,
    serviceCreateUser,
    serviceGetUserById,
    serviceUpdateUserById,
    serviceDeleteUserById,
    serviceSoftDeleteUserById,
    serviceGetUserDisableById,
    serviceGetAllDeletedUsers,
    serviceGetDeletedUsersById,
    serviceGetAllUsersDisabled,
    serviceGetAmountCollectionsByEmail,
    serviceActivateOrChangeUserStatusById,
    serviceVerificationInformationToCreateUser,
} from "../services/user.service";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import userConstants from "../utils/userConstants";
import secrets from "../config/secrets";
import { errorFunction } from "../services/general.service";

const logger = log4js.getLogger();
logger.level = "debug";

async function createUser(req, res) {
    console.log("\n");
    logger.info("[createUser] INIT");
    try {

        const objectUser = req.body;
        let response = await serviceVerificationInformationToCreateUser(objectUser);
        if (!response) {
            return errorFunction(userConstants.VERIFICATION_ERROR_CODE, userConstants.VERIFICATION_ERROR);
        }
        let user = await serviceCreateUser(objectUser);
        user.registerToken = jwt.sign({id: user._id}, secrets.jwtRegisterSecret);
        console.log(user);
        await user.save();
        ResponseUtil.success(res, user);

    } catch (error) {

        logger.error("[createUser] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[createUser] FINISH");
}

async function getAllUsers(req, res) {
    console.log("\n");
    logger.info("[getAllUsers] INIT");
    try {

        let users = await serviceGetAllUser();
        ResponseUtil.success(res, users);

    } catch (error) {

        logger.error("[getAllUsers] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[getAllUsers] FINISH");
}

async function getAllDeletedUsers(req, res) {
    console.log("\n");
    logger.info("[getAllDeletedUsers] INIT");
    try {

        let users = await serviceGetAllDeletedUsers();
        ResponseUtil.success(res, users);

    } catch (error) {

        logger.error("[getAllDeletedUsers] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[getAllDeletedUsers] FINISH");
}

async function getAllUsersDisabled(req, res) {
    console.log("\n");
    logger.info("[getAllUsersDisabled] INIT");
    try {

        let users = await serviceGetAllUsersDisabled();
        ResponseUtil.success(res, users);

    } catch (error) {

        logger.error("[getAllUsersDisabled] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[getAllUsersDisabled] FINISH");
}

async function getUserById(req, res) {
    console.log("\n");
    logger.info("[getUserById] INIT");
    try {

        const userIdString = req.params.userId;
        let user = await serviceGetUserById(userIdString);
        ResponseUtil.success(res, user);

    } catch (error) {

        logger.error("[getUserById] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[getUserById] FINISH");
}

async function getDeletedUsersById(req, res) {
    console.log("\n");
    logger.info("[getDeletedUsersById] INIT");
    try {

        const userIdString = req.params.userId;
        let user = await serviceGetDeletedUsersById(userIdString);
        ResponseUtil.success(res, user);

    } catch (error) {

        logger.error("[getDeletedUsersById] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[getDeletedUsersById] FINISH");
}

async function getUserDisableById(req, res) {
    console.log("\n");
    logger.info("[getUserDisableById] INIT");
    try {

        const userIdString = req.params.userId;
        let user = await serviceGetUserDisableById(userIdString);
        ResponseUtil.success(res, user);

    } catch (error) {

        logger.error("[getUserDisableById] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[getUserDisableById] FINISH");
}

async function updateUserById(req, res) {
    console.log("\n");
    logger.info("[updateUserById] INIT");
    try {

        const userIdString = req.params.userId;
        delete req.body.active;
        delete req.body.deleted;
        delete req.body.email;
        const userObject = req.body;
        let user = await serviceUpdateUserById(userIdString, userObject);
        ResponseUtil.success(res, user);

    } catch (error) {

        logger.error("[updateUserById] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[updateUserById] FINISH");
}

async function changeUserStatusById(req, res) {
    console.log("\n");
    logger.info("[changeUserStatusById] INIT");
    try {

        const userIdString = req.params.userId;
        const activationOption = req.body.active;
        const user = await serviceActivateOrChangeUserStatusById(userIdString, activationOption);
        if (!user) {
            errorFunction(userConstants.USER_NOT_FOUND_CODE, userConstants.USER_NOT_FOUND);
        }
        ResponseUtil.success(res, user);

    } catch (error) {

        logger.error("[changeUserStatusById] ERROR", error);
        ResponseUtil.badRequest(res, error.code ? error.code : userConstants.USER_NOT_FOUND_CODE, error.message);

    }

    logger.info("[changeUserStatusById] FINISH");
}

async function softDeleteUserById(req, res) {
    console.log("\n");
    logger.info("[softDeleteUserById] INIT");
    try {

        const userIdString = req.params.userId;
        const user = await serviceSoftDeleteUserById(userIdString);
        if (!user) {
            errorFunction(userConstants.USER_NOT_FOUND_CODE, userConstants.USER_NOT_FOUND);
        }
        ResponseUtil.success(res, user);

    } catch (error) {

        logger.error("[softDeleteUserById] ERROR", error);
        ResponseUtil.badRequest(res, error.code ? error.code : userConstants.USER_NOT_FOUND_CODE, error.message);

    }

    logger.info("[softDeleteUserById] FINISH");
}

async function deleteUserById(req, res) {
    console.log("\n");
    logger.info("[deleteUserById] INIT");
    try {

        const userIdString = req.params.userId;
        const user = await serviceDeleteUserById(userIdString);
        ResponseUtil.success(res, user);

    } catch (error) {

        logger.error("[deleteUserById] ERROR", error);
        ResponseUtil.badRequest(res, error.code ? error.code : userConstants.USER_NOT_FOUND_CODE, error.message);

    }

    logger.info("[deleteUserById] FINISH");
}

async function verifyEmailExist(req, res) {
    console.log("\n");
    logger.info("[verifyEmailExist] INIT");
    try {

        const emailString = req.params.email;
        let response = await serviceGetAmountCollectionsByEmail(emailString);
        ResponseUtil.success(res, response ? true : false);

    } catch (error) {

        logger.error("[verifyEmailExist] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[verifyEmailExist] FINISH");
}

export {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    verifyEmailExist,
    getAllDeletedUsers,
    softDeleteUserById,
    getUserDisableById,
    getAllUsersDisabled,
    getDeletedUsersById,
    changeUserStatusById,
};
