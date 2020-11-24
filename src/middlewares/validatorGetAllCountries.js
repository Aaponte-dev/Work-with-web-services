import Joi from "@hapi/joi";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = "debug";

const validatorGetAllCountries = (req, res, next) => {
    logger.info("[validatorGetAllCountries] INIT");

    const data = req.params;

    const schema = Joi.object({
        "orderBy": Joi.string().lowercase().valid('asc', 'desc').optional(),
    });

    const { error } = schema.validate(data);

    logger.info("[validatorGetAllCountries] FINISH");
    error ? ResponseUtil.unprocessableEntity(res, errors.VALIDATION_FAILED, errors.VALIDATION_FAILED_MESSAGE, error.details[0].message) : next();
};

export default validatorGetAllCountries;