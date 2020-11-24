import log4js from "log4js";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import {
    serviceCreateState,
    serviceGetAllStates,
    serviceGetStateById,
    serviceDeleteStateById,
    serviceUpdateStateById,
    checkCreationConditions,
    serviceDeleteStateByIds,
    serviceGetAllStatesByCountry
} from "../services/state.service";
import stateConstants from "../utils/stateConstants";
import { errorFunction } from "../services/general.service";

const logger = log4js.getLogger();
logger.level = "debug";

async function createState(req, res) {
    console.log("\n");
    logger.info("[createState] INIT");

    try {

        const objectState = req.body;
        const verificationResponse = await checkCreationConditions(objectState, stateConstants.CREATE_STATE_MODULE);
        if (!verificationResponse) {
            errorFunction(stateConstants.NOT_UNIQUE_VALUE_CODE, stateConstants.NOT_UNIQUE_VALUE);
        }
        const state = await serviceCreateState(objectState);
        ResponseUtil.success(res, state);

    } catch (error) {

        logger.error("[createState] ERROR", error);
        ResponseUtil.badRequest(res, error.code ? error.code : errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[createState] FINISH");
}

async function getAllStates(req, res) {
    console.log("\n");
    logger.info("[getAllStates] INIT");

    try {

        const states = await serviceGetAllStates();
        ResponseUtil.success(res, states);

    } catch (error) {

        logger.error("[getAllStates] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[getAllStates] FINISH");
}

async function getAllStatesByCountry(req, res) {
    console.log("\n");
    logger.info("[getAllStatesByCountry] INIT");

    try {

        const states = await serviceGetAllStatesByCountry(req.params.countryId, req.headers["accept-language"]);
        ResponseUtil.success(res, states);

    } catch (error) {

        logger.error("[getAllStatesByCountry] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[getAllStatesByCountry] FINISH");
}

async function getStateById(req, res) {
    console.log("\n");
    logger.info("[getStateById] INIT");

    try {

        const stateId = req.params.stateId;
        const state = await serviceGetStateById(stateId);
        ResponseUtil.success(res, state);

    } catch (error) {

        logger.error("[getStateById] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[getStateById] FINISH");
}

async function updateStateById(req, res) {
    console.log("\n");
    logger.info("[createState] INIT");

    try {

        let objectState = req.body;
        objectState.isoCode = objectState.isoCode.toUpperCase();
        const stateId = req.params.stateId;
        const verificationResponse = await checkCreationConditions(objectState, stateConstants.UPDATE_STATE_MODULE, stateId);
        if (!verificationResponse) {
            errorFunction(stateConstants.NOT_UNIQUE_VALUE_CODE, stateConstants.NOT_UNIQUE_VALUE);
        }
        const updatedState = await serviceUpdateStateById(stateId, objectState);
        ResponseUtil.success(res, updatedState);

    } catch (error) {

        logger.error("[createState] ERROR", error);
        ResponseUtil.badRequest(res, error.code ? error.code : errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[createState] FINISH");
}

async function deleteStateById(req, res) {
    console.log("\n");
    logger.info("[deleteStateById] INIT");

    try {

        const stateId = req.params.stateId;
        const deletedState = await serviceDeleteStateById(stateId);
        ResponseUtil.success(res, deletedState);

    } catch (error) {

        logger.error("[deleteStateById] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[deleteStateById] FINISH");
}

async function deleteManyStateByIds(req, res) {
    console.log("\n");
    logger.info("[deleteManyStateByIds] INIT");

    try {

        const arrayOfStateIds = req.body.stateIds;
        const deletedState = await serviceDeleteStateByIds(arrayOfStateIds);
        ResponseUtil.success(res, deletedState);

    } catch (error) {

        logger.error("[deleteManyStateByIds] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[deleteManyStateByIds] FINISH");
}

export {
    createState,
    getAllStates,
    getStateById,
    deleteStateById,
    updateStateById,
    deleteManyStateByIds,
    getAllStatesByCountry
}