import log4js from "log4js";
import {
    serviceCreateCountry,
    serviceGetCountryById,
    serviceGetAllCountries,
    checkCreationConditions,
    serviceUpdateCountryById,
    serviceDeleteCountryById,
    serviceDeleteCountryByIds,
    getAmountCollectionsByIsoCode,
    getAmountCollectionsByCallPrefix
} from "../services/country.service";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import countryConstants from "../utils/countryConstants";
import { errorFunction } from "../services/general.service";

const logger = log4js.getLogger();
logger.level = "debug";

async function createCountry(req, res) {
    console.log("\n");
    logger.info("[createCountry] INIT");

    try {

        const objectCountry = req.body;
        const verificationResponse = await checkCreationConditions(objectCountry);

        if (!verificationResponse) {
            errorFunction(countryConstants.NOT_UNIQUE_VALUE_CODE, countryConstants.NOT_UNIQUE_VALUE);
        }

        const creationResponse = await serviceCreateCountry(objectCountry);
        ResponseUtil.success(res, creationResponse);

    } catch (error) {

        logger.error("[createCountry] ERROR", error);
        ResponseUtil.badRequest(res,error.code ? error.code : errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[createCountry] FINISH");
}

async function getAllCountries(req, res) {
    console.log("\n");
    logger.info("[getAllCountries] INIT");

    try {

        const countries = await serviceGetAllCountries(req.headers["accept-language"], req.params.orderBy);
        ResponseUtil.success(res, countries);

    } catch (error) {

        logger.error("[getAllCountries] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[getAllCountries] FINISH");
}

async function getCountryById(req, res) {
    console.log("\n");
    logger.info("[getCountryById] INIT");

    try {

        const countryId = req.params.countryId;
        const country = await serviceGetCountryById(countryId);
        ResponseUtil.success(res, country);

    } catch (error) {

        logger.error("[getCountryById] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[getCountryById] FINISH");
}

async function updateCountryById(req, res) {
    console.log("\n");
    logger.info("[updateCountryById] INIT");

    try {

        const countryId = req.params.countryId;
        const objectCountry = req.body;
        const updatedCountry = await serviceUpdateCountryById(countryId, objectCountry);
        ResponseUtil.success(res, updatedCountry);

    } catch (error) {

        logger.error("[updateCountryById] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[updateCountryById] FINISH");
}

async function deleteCountryById(req, res) {
    console.log("\n");
    logger.info("[deleteCountryById] INIT");

    try {

        const countryId = req.params.countryId;
        const updatedCountry = await serviceDeleteCountryById(countryId);
        ResponseUtil.success(res, updatedCountry);

    } catch (error) {

        logger.error("[deleteCountryById] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[deleteCountryById] FINISH");
}

async function deleteManyCountries(req, res) {
    console.log("\n");
    logger.info("[deleteManyCountries] INIT");

    try {

        const arrayOfCountryIds = req.body.countryIds;
        const deleteResponse = await serviceDeleteCountryByIds(arrayOfCountryIds);
        ResponseUtil.success(res, deleteResponse);

    } catch (error) {

        logger.error("[deleteManyCountries] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[deleteManyCountries] FINISH");
}

async function checkExistenceOfIsoCode(req, res) {
    console.log("\n");
    logger.info("[checkExistenceOfIsoCode] INIT");

    try {

        const isoCodeString = req.params.isoCode.toUpperCase();
        const collectionQuantity = await getAmountCollectionsByIsoCode(isoCodeString);
        ResponseUtil.success(res, collectionQuantity);

    } catch (error) {

        logger.error("[checkExistenceOfIsoCode] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[checkExistenceOfIsoCode] FINISH");
}

async function checkExistenceOfCallPrefix(req, res) {
    console.log("\n");
    logger.info("[checkExistenceOfCallPrefix] INIT");

    try {

        const callPrefixString = req.params.callPrefix.toUpperCase();
        const collectionQuantity = await getAmountCollectionsByCallPrefix(callPrefixString);
        ResponseUtil.success(res, collectionQuantity);

    } catch (error) {

        logger.error("[checkExistenceOfCallPrefix] ERROR", error);
        ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);

    }

    logger.info("[checkExistenceOfCallPrefix] FINISH");
}

export {
    createCountry,
    getCountryById,
    getAllCountries,
    updateCountryById,
    deleteCountryById,
    deleteManyCountries,
    checkExistenceOfIsoCode,
    checkExistenceOfCallPrefix
};
