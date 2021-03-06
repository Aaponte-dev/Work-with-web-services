import log4js from "log4js";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";

const logger = log4js.getLogger();
logger.level = "debug";

const errorHandlingJWT = (err, req, res, next) => {
  logger.info("[errorHandlingJWT] INIT");

  if (err.name === "UnauthorizedError") {
    ResponseUtil.unauthorized(res, errors.UNAUTHORIZED, errors.UNAUTHORIZED_MESSAGE);
  }

  logger.info("[errorHandlingJWT] FINISH");
};

export default errorHandlingJWT;
