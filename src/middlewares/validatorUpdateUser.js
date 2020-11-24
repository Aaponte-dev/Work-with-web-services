import Joi from "@hapi/joi";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = "debug";

const validatorUpdateUser = (req, res, next) => {
    logger.info("[validatorUpdateUser] INIT");

    const data = req.body;

    const schema = Joi.object({
        "roleId": Joi.string().required(),
        "firstName": Joi.string().required(),
        "lastName": Joi.string().required()
    });

    const { error } = schema.validate(data);

    logger.info("[validatorUpdateUser] FINISH");
    error ? ResponseUtil.unprocessableEntity(res, errors.VALIDATION_FAILED, errors.VALIDATION_FAILED_MESSAGE, error.details[0].message) : next();
};

export default validatorUpdateUser;