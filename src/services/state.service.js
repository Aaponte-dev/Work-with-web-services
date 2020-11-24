import State from "../models/State";
import { serviceGetCountryById } from "../services/country.service";
import defaultConstants from "../utils/defaultConstants";
import stateConstants from "../utils/stateConstants";

async function serviceCreateState(objectState) {
    return await State.create(objectState);
}

async function serviceGetAllStatesByCountry(countryId, langIsoCode) {
    return State.find({
        active: true,
        countryId: countryId,
        "lang.isoCode": langIsoCode || defaultConstants.LANG_ISO_CODE
    });
}

async function serviceGetAllStates() {
    return State.find({
        active: true
    });
}

async function serviceGetStateById(stateId) {
    return await State.findOne({
        _id: stateId,
        active: true
    });
}

async function serviceUpdateStateById(stateId, objectState) {
    return await State.findByIdAndUpdate(stateId, objectState, {new: true});
}

async function serviceDeleteStateById(stateId) {
    return await State.findByIdAndDelete(stateId);
}

async function serviceDeleteStateByIds(arrayOfStateIds) {
    return await State.deleteMany({
        _id: {
            $in: arrayOfStateIds
        }
    });
}

async function getAmountCollectionsByIsoCode(isoCode) {
    let collectionQuantity = await State.countDocuments({
        isoCode: isoCode
    });

    return collectionQuantity ? collectionQuantity : 0;
}

async function getAmountCollectionsByIsoCodeUpdate(isoCode, stateId) {
    let collectionQuantity = await State.countDocuments({
        isoCode: isoCode,
        _id: {
            $ne: stateId
        }
    });

    return collectionQuantity ? collectionQuantity : 0;
}

async function checkCreationConditions(objectState, module, stateId = null) {
    const amountCollectionByIsoCode = module === stateConstants.CREATE_STATE_MODULE ? await getAmountCollectionsByIsoCode(objectState.isoCode) : await getAmountCollectionsByIsoCodeUpdate(objectState.isoCode, stateId);
    const country = await serviceGetCountryById(objectState.countryId);

    if (amountCollectionByIsoCode > 0 || !country) {
        return false;
    }

    return true;
}

export {
    serviceCreateState,
    serviceGetStateById,
    serviceGetAllStates,
    serviceUpdateStateById,
    serviceDeleteStateById,
    serviceDeleteStateByIds,
    checkCreationConditions,
    serviceGetAllStatesByCountry
};