import express from "express";
import {
    createRole,
    getAllRoles,
    getRoleById,
    updateRoleById,
    deleteRoleById
} from "../controllers/role.controller";
import validatorCreateRole from "../middlewares/validatorCreateRole";

const router = express.Router();

router.route("/")
    .get(getAllRoles)
    .post(validatorCreateRole, createRole);

router.route("/:roleId")
    .get(getRoleById)
    .put(validatorCreateRole, updateRoleById)
    .delete(deleteRoleById);


module.exports = router;