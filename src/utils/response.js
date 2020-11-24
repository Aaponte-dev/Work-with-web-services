const CODE_OK = 200;
const CODE_NO_CONTENT = 204;
const CODE_BAD_REQUEST = 400;
const CODE_UNAUTHORIZED = 401;
const CODE_FORBIDDEN = 403;
const CODE_NOT_FOUND = 404;
const CODE_UNPROCESSABLE_ENTITY = 422;
const CODE_SERVER_ERROR = 500;
const SUCCESS_MESSAGE = "Request successful";

export default class Responses {
  static success(res, data) {
    res.status(CODE_OK)
      .json({
        success: true,
        data: data,
        message: SUCCESS_MESSAGE
      });
  }

  static noContent(res, data, message) {
    res.status(CODE_NO_CONTENT)
      .json({
        success: true,
        data: data,
        message: message
      });
  }

  static badRequest(res, errorCode, message) {
    res.status(CODE_BAD_REQUEST)
      .json({
        success: false,
        code: errorCode,
        message: message
      });
  }

  static unauthorized(res, errorCode, message) {
    res.status(CODE_UNAUTHORIZED)
      .json({
        success: false,
        code: errorCode,
        message: message
      });
  }

  static forbidden(res, errorCode, message) {
    res.status(CODE_FORBIDDEN)
      .json({
        success: false,
        code: errorCode,
        message: message
      });
  }

  static notFound(res, errorCode, message) {
    res.status(CODE_NOT_FOUND)
      .json({
        success: false,
        code: errorCode,
        message: message
      });
  }

  static unprocessableEntity(res, errorCode, message, error) {
    res.status(CODE_UNPROCESSABLE_ENTITY)
      .json({
        success: false,
        code: errorCode,
        message: message,
        error: error
      });
  }

  static serverError(res, errorCode, message) {
    res.status(CODE_SERVER_ERROR)
      .json({
        success: false,
        code: errorCode,
        message: message
      });
  }
}
