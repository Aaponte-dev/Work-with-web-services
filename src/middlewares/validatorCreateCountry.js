import Joi from "@hapi/joi";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = "debug";

const validatorCreateCountry = (req, res, next) => {
    logger.info("[validatorCreateCountry] INIT");

    const data = req.body;

    const schema = Joi.object({
        "lang": Joi.array().items(
            Joi.object({
                name: Joi.string().required(),
                isoCode: Joi.string().required()
            })
        ).min(1).required(),
        "isoCode": Joi.string().required(),
        "callPrefix": Joi.string().required()
    });

    const { error } = schema.validate(data);

    logger.info("[validatorCreateCountry] FINISH");
    error ? ResponseUtil.unprocessableEntity(res, errors.VALIDATION_FAILED, errors.VALIDATION_FAILED_MESSAGE, error.details[0].message) : next();
};

export default validatorCreateCountry;