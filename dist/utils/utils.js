"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parse(JSONstr) {
    return JSON.parse(JSONstr);
}
exports.parse = parse;
function uniqueRid() {
    return Math.floor(Math.random() * 10e12);
}
exports.uniqueRid = uniqueRid;
function validateRid(rid) {
    return (data) => {
        if (data.rid !== rid) {
            throw new Error('RequestID mismatch');
        }
        return data;
    };
}
exports.validateRid = validateRid;
function errorParser(err) {
    if (err) {
        if (err.response) {
            if (err.response.data) {
                if (err.response.data.type) {
                    return Promise.reject(new Error(err.response.data.type));
                }
                return Promise.reject(new Error(err.response.data));
            }
            return Promise.reject(new Error(err.response));
        }
        return Promise.reject(err);
    }
    return Promise.reject(new Error('Unkown error'));
}
exports.errorParser = errorParser;
//# sourceMappingURL=utils.js.map