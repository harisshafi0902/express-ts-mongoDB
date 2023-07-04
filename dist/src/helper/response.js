"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["OK"] = 200] = "OK";
    ResponseStatus[ResponseStatus["CREATED"] = 201] = "CREATED";
    ResponseStatus[ResponseStatus["BAD_REQUEST"] = 401] = "BAD_REQUEST";
    ResponseStatus[ResponseStatus["NOT_AUTHORIZED"] = 400] = "NOT_AUTHORIZED";
    ResponseStatus[ResponseStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResponseStatus[ResponseStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseStatus[ResponseStatus["SERVER_ERROR"] = 500] = "SERVER_ERROR";
    ResponseStatus[ResponseStatus["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
})(ResponseStatus || (ResponseStatus = {}));
exports.default = ResponseStatus;
