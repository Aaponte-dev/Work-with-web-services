import Country from "../models/Country";
import defaultConstants from "../utils/defaultConstants";

async function serviceCreateCountry(objectCountry) {
    return await Country.create(objectCountry);
}

async function serviceGetAllCountries(langIsoCode, orderBy = defaultConstants.ORDER_BY_ASC) {
    return await Country.find({
        active: true,
        "lang.isoCode": langIsoCode || defaultConstants.LANG_ISO_CODE
    }).sort({
        "isoCode": orderBy
    });
}

async function serviceGetCountryById(countryId) {
    return await Country.findOne({
        _id: countryId,
        active: true
    });
}

async function serviceUpdateCountryById(countryId, objectCountry) {
    return await Country.findByIdAndUpdate(countryId, objectCountry, {new: true});
}

async function serviceDeleteCountryById(countryId) {
    return await Country.findByIdAndDelete(countryId);
}

async function serviceDeleteCountryByIds(arrayOfCountryIds) {
    return await Country.deleteMany({
        _id: {
            $in: arrayOfCountryIds
        }
    });
}

async function getAmountCollectionsByIsoCode(isoCode) {
    const collectionQuantity = await Country.countDocuments({
        isoCode: isoCode
    });

    return collectionQuantity ? collectionQuantity : 0;
}

async function getAmountCollectionsByCallPrefix(callPrefix) {
    const collectionQuantity = await Country.countDocuments({
        callPrefix: callPrefix
    });

    return collectionQuantity ? collectionQuantity : 0;
}

async function checkCreationConditions(objectCountry) {
    const amountCollectionByIsoCode = await getAmountCollectionsByIsoCode(objectCountry.isoCode);
    const amountCollectionByCallPrefix = await getAmountCollectionsByIsoCode(objectCountry.callPrefix);

    if (amountCollectionByCallPrefix > 0 || amountCollectionByIsoCode > 0) {
        return false;
    }

    return true;
}


export {
    serviceCreateCountry,
    serviceGetCountryById,
    serviceGetAllCountries,
    checkCreationConditions,
    serviceUpdateCountryById,
    serviceDeleteCountryById,
    serviceDeleteCountryByIds,
    getAmountCollectionsByIsoCode,
    getAmountCollectionsByCallPrefix
};