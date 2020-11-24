import Joi from "@hapi/joi";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = "debug";

const validatorCreateRole = (req, res, next) => {
    logger.info("[validatorCreateRole] INIT");

    const data = req.body;

    const schema = Joi.object({
        "name": Joi.string().required()
    });

    const { error } = schema.validate(data);

    logger.info("[validatorCreateRole] FINISH");
    error ? ResponseUtil.unprocessableEntity(res, errors.VALIDATION_FAILED, errors.VALIDATION_FAILED_MESSAGE, error.details[0].message) : next();
};

export default validatorCreateRole;