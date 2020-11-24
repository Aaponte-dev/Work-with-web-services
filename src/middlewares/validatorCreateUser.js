import Joi from "@hapi/joi";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = "debug";

const validatorCreateUser = (req, res, next) => {
    logger.info("[validatorCreateUser] INIT");

    const data = req.body;

    const schema = Joi.object({
        "email": Joi.string().email().required(),
        "roleId": Joi.string().required(),
        "firstName": Joi.string().required(),
        "lastName": Joi.string().required(),
        "password": Joi.string().min(8).max(16),
    });

    const { error } = schema.validate(data);

    logger.info("[validatorCreateUser] FINISH");
    error ? ResponseUtil.unprocessableEntity(res, errors.VALIDATION_FAILED, errors.VALIDATION_FAILED_MESSAGE, error.details[0].message) : next();
};

export default validatorCreateUser;