function errorFunction(code, message) {
    let error = new Error(message);
    error.code = code;
    throw (error);
}

export {
    errorFunction
};