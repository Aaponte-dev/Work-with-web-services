import express from "express";
import {
    createState,
    getAllStates,
    getStateById,
    deleteStateById,
    updateStateById,
    deleteManyStateByIds,
    getAllStatesByCountry
} from "../controllers/state.controller";
import validatorCreateState from "../middlewares/validatorCreateState";
import validatorDeleteManyStates from "../middlewares/validatorDeleteManyStates";

const router = express.Router();

router.route("/")
    .get(getAllStates)
    .post(validatorCreateState, createState);

router.delete("/delete-many", validatorDeleteManyStates, deleteManyStateByIds);

router.get("/all/:countryId", getAllStatesByCountry);

router.route("/:stateId")
    .get(getStateById)
    .put(validatorCreateState, updateStateById)
    .delete(deleteStateById);

module.exports = router;