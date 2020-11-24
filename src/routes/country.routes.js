import express from "express";
import {
    createCountry,
    getCountryById,
    getAllCountries,
    updateCountryById,
    deleteCountryById,
    deleteManyCountries,
    checkExistenceOfIsoCode,
    checkExistenceOfCallPrefix
} from "../controllers/country.controller";
import validatorCreateCountry from "../middlewares/validatorCreateCountry";
import validatorGetAllCountries from "../middlewares/validatorGetAllCountries";
import validatorDeleteManyCountries from "../middlewares/validatorDeleteManyCountries";

const router = express.Router();

router.post("/", validatorCreateCountry, createCountry);

router.delete("/delete-many", validatorDeleteManyCountries, deleteManyCountries);

router.get("/verification/iso-code/:isoCode", checkExistenceOfIsoCode);

router.get("/verification/call-prefix/:callPrefix", checkExistenceOfCallPrefix);

router.get("/all/:orderBy?", validatorGetAllCountries, getAllCountries);

router.route("/:countryId")
    .get(getCountryById)
    .put(validatorCreateCountry, updateCountryById)
    .delete(deleteCountryById);




module.exports = router;