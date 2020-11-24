import log4js from "log4js";
import {
    serviceCreateRole,
    serviceGetAllRoles,
    serviceGetRoleById,
    serviceUpdateRoleById,
    serviceDeleteRoleById
} from "../services/role.service";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";

const logger = log4js.getLogger();
logger.level = "debug";

async function createRole(req, res) {
    console.log("\n");
    logger.info("[createRole] INIT");

    try {

        let objectRole = req.body;
        objectRole.name = objectRole.name.toUpperCase();
        const role = await serviceCreateRole(objectRole);
        ResponseUtil.success(res, role);

    } catch (error) {

        logger.error("[createRole] ERROR", error);
        ResponseUtil.badRequest(res, error.code ? error.code : errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[createRole] FINISH");
}

async function getAllRoles(req, res) {
    console.log("\n");
    logger.info("[getAllRoles] INIT");

    try {

        const roles = await serviceGetAllRoles();
        ResponseUtil.success(res, roles);

    } catch (error) {

        logger.error("[getAllRoles] ERROR", error);
        ResponseUtil.badRequest(res, error.code ? error.code : errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[getAllRoles] FINISH");
}

async function getRoleById(req, res) {
    console.log("\n");
    logger.info("[getRoleById] INIT");

    try {

        const roleId = req.params.roleId;
        const role = await serviceGetRoleById(roleId);
        ResponseUtil.success(res, role);

    } catch (error) {

        logger.error("[getRoleById] ERROR", error);
        ResponseUtil.badRequest(res, error.code ? error.code : errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[getRoleById] FINISH");
}

async function updateRoleById(req, res) {
    console.log("\n");
    logger.info("[updateRoleById] INIT");

    try {

        const roleId = req.params.roleId;
        const objectRole = req.body;
        const role = await serviceUpdateRoleById(roleId, objectRole);
        ResponseUtil.success(res, role);

    } catch (error) {

        logger.error("[updateRoleById] ERROR", error);
        ResponseUtil.badRequest(res, error.code ? error.code : errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[updateRoleById] FINISH");
}

async function deleteRoleById(req, res) {
    console.log("\n");
    logger.info("[deleteRoleById] INIT");

    try {

        const roleId = req.params.roleId;
        const role = await serviceDeleteRoleById(roleId);
        ResponseUtil.success(res, role);

    } catch (error) {

        logger.error("[deleteRoleById] ERROR", error);
        ResponseUtil.badRequest(res, error.code ? error.code : errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[deleteRoleById] FINISH");
}

export {
    createRole,
    getAllRoles,
    getRoleById,
    deleteRoleById,
    updateRoleById
}