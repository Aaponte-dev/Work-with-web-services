import express from "express";
import {
    getAllUsers,
    deleteUserById,
    softDeleteUserById,
    getAllDeletedUsers,
    getUserDisableById,
    getAllUsersDisabled,
    getDeletedUsersById,
    changeUserStatusById,
} from "../controllers/user.controller";
import validatorChangeStatus from "../middlewares/validatorChangeStatus";

const router = express.Router();

router.route("/user")
    .get(getAllUsers);

router.route("/user/:userId")
    .get(getAllUsers)
    .delete(deleteUserById);

router.route("/change-status/:userId")
    .patch(validatorChangeStatus, changeUserStatusById);

router.route("/soft-delete/:userId")
    .delete(softDeleteUserById);

router.route("/user/deleted")
    .get(getAllDeletedUsers);

router.route("/user/disabled")
    .get(getAllUsersDisabled);

router.route("/user/deleted/:userId")
    .get(getDeletedUsersById);

router.route("/user/disabled/:userId")
    .get(getUserDisableById);

module.exports = router;