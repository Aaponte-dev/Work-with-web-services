import Joi from "@hapi/joi";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = "debug";

const validatorDeleteManyStates = (req, res, next) => {
    logger.info("[validatorDeleteManyStates] INIT");

    const data = req.body;

    const schema = Joi.object({
        "stateIds": Joi.array().unique().min(2).required()
    })

    const { error } = schema.validate(data);

    logger.info("[validatorDeleteManyStates] FINISH");
    error ? ResponseUtil.unprocessableEntity(res, errors.VALIDATION_FAILED, errors.VALIDATION_FAILED_MESSAGE, error.details[0].message) : next();
};

export default validatorDeleteManyStates;