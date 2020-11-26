require("dotenv").config();
import jwt from "jsonwebtoken";
import Role from "../models/Role";
import User from "../models/User";
import secrets from "../config/secrets";
import ResponseUtil from "../utils/response";

async function serviceCreateUser(userObject) {
    return await User.create(userObject);
}

async function serviceGetAmountCollectionsByEmail(emailString) {
    const quantityCollectionByEmail = await User.countDocuments({
        email: emailString
    });

    return quantityCollectionByEmail ? quantityCollectionByEmail : 0;
}

async function serviceVerificationRoleExist(roleIdString) {
    return await Role.findOne({
        _id: roleIdString,
        deleted: false
    });
}

async function serviceVerificationInformationToCreateUser(userObject) {
    const amountCollectionsByEmail = await serviceGetAmountCollectionsByEmail(userObject.email);
    const informationVerification = await serviceVerificationRoleExist(userObject.roleId);

    if (!informationVerification || amountCollectionsByEmail) {
        return false;
    }

    return true;

}

async function serviceGetAllUser() {
    return await User.find({
        deleted: false,
        active: true
    });
}

async function serviceGetAllDeletedUsers() {
    return await User.find({
        deleted: true
    });
}

async function serviceGetAllUsersDisabled(params) {
    return await User.find({
        active: false
    });
}

async function serviceGetDeletedUsersById(userIdString) {
    return await User.findOne({
        _id: userIdString,
        deleted: true
    });
}

async function serviceGetUserDisableById(userIdString) {
    return await User.findOne({
        _id: userIdString,
        active: false
    });
}

async function serviceGetUserById(userIdString) {
    return await User.findOne({
        _id: userIdString,
        deleted: false,
        active: true
    });
}

async function serviceUpdateUserById(userIdString, userObject) {
    return await User.findOneAndUpdate(userIdString, userObject, {new: true});
}

async function serviceActivateOrChangeUserStatusById(userIdString, activationOption) {
    let user = await User.findById(userIdString);
    if (!user) {
        return false;
    }
    user.active = activationOption;
    return await user.save();
}

async function serviceSoftDeleteUserById(userIdString) {
    const user = await serviceGetUserById(userIdString);
    if (!user) {
        return false;
    }
    return await user.delete();
}

async function serviceDeleteUserById(userIdString) {
    return await User.findByIdAndDelete(userIdString);
}

async function serviceGetUserByEmail(email) {
    if (email) {
        return await User.findOne({ email: email })
            .select("-registerToken -resetPasswordToken");
    }

    return null;
}

async function serviceLogin(user, unencryptedPasswordString) {
    let response = isActive(user);
    if (!response) {
        return false;
    }
    response = await validatePassword(user, unencryptedPasswordString);
    if (!response) {
        return false;
    }
    user.password = undefined;
    return user;
}

function responseWithJWT(response, user) {
    const token = jwt.sign({ id: user._id }, secrets.jwtSecret, { expiresIn: process.env.SESSION_EXPIRATION_TIME });
    ResponseUtil.success(response, {
        user: user,
        jwt: token
    });
}

async function validatePassword(user, password) {
    if (user) {
        return await user.verifyPassword(password);
    }

    return false;
}

function isActive(user) {
    if (user) {
        return user.active && !user.deleted;
    }

    return false;
}

async function existsResetPasswordToken(resetPasswordToken) {
    if (!resetPasswordToken) {
        return false;
    }

    return await User.find({
        resetPasswordToken: resetPasswordToken
    });
}

function serviceSetPassword(id, password) {
    return User.findByIdAndUpdate(id, { $set: { password } }, { new: true })
        .select("-password -registerToken -resetPasswordToken");
}

export {
    isActive,
    serviceLogin,
    responseWithJWT,
    serviceGetAllUser,
    serviceCreateUser,
    serviceGetUserById,
    serviceSetPassword,
    serviceUpdateUserById,
    serviceGetUserByEmail,
    serviceDeleteUserById,
    existsResetPasswordToken,
    serviceGetAllDeletedUsers,
    serviceSoftDeleteUserById,
    serviceGetUserDisableById,
    serviceGetAllUsersDisabled,
    serviceGetDeletedUsersById,
    serviceVerificationRoleExist,
    serviceGetAmountCollectionsByEmail,
    serviceActivateOrChangeUserStatusById,
    serviceVerificationInformationToCreateUser
};