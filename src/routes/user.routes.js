import express from "express";
import {
    createUser,
    getUserById,
    updateUserById,
    verifyEmailExist,
} from "../controllers/user.controller";
import validatorCreateUser from "../middlewares/validatorCreateUser";
import validatorUpdateUser from "../middlewares/validatorUpdateUser";

const router = express.Router();

router.route("/")
    .post(validatorCreateUser, createUser);

router.route("/:userId")
    .get(getUserById)
    .put(validatorUpdateUser, updateUserById);

router.route("/mail-exist/:email")
    .get(verifyEmailExist);

module.exports = router;