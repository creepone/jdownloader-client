"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JDownloaderCryptoSuite = exports.DeviceStatus = void 0;
const axios_1 = require("axios");
const crypto = require("crypto");
const querystring = require("querystring");
const crypto_1 = require("./utils/crypto");
const utils_1 = require("./utils/utils");
var DeviceStatus;
(function (DeviceStatus) {
    DeviceStatus["UNKNOWN"] = "UNKNOWN";
})(DeviceStatus = exports.DeviceStatus || (exports.DeviceStatus = {}));
class JDownloaderCryptoSuite {
    constructor({ email, password, appKey = 'jdownloader-api-indev', apiVer = 1 }) {
        this.loginSecret = (0, crypto_1.sha256)(email + password + 'server');
        this.deviceSecret = (0, crypto_1.sha256)(email + password + 'device');
        this.sessionToken = null;
        this.regainToken = null;
        this.serverEncryptionToken = null;
        this.deviceEncryptionToken = null;
        this.email = email;
        this.appKey = appKey;
        this.apiVer = apiVer;
    }
    /**
     * Connect to MyJDownloader with the credentils provided in the constructor
     */
    connect() {
        return this.callServer('/my/connect', this.loginSecret, {
            appkey: this.appKey,
            email: this.email
        }).then((data) => {
            this.sessionToken = data.sessiontoken;
            this.regainToken = data.regaintoken;
            this.serverEncryptionToken = (0, crypto_1.createEncryptionToken)(this.loginSecret, this.sessionToken);
            this.deviceEncryptionToken = (0, crypto_1.createEncryptionToken)(this.deviceSecret, this.sessionToken);
        });
    }
    /**
     * Reconnects to MyJDownloader with the credentils provided in the constructor
     */
    reconnect() {
        return this.callServer('/my/reconnect', this.serverEncryptionToken, {
            appkey: this.appKey,
            sessiontoken: this.sessionToken,
            regaintoken: this.regainToken // tslint:disable-line:object-literal-sort-keys
        }).then((data) => {
            this.sessionToken = data.sessiontoken;
            this.regainToken = data.regaintoken;
            this.serverEncryptionToken = (0, crypto_1.createEncryptionToken)(this.serverEncryptionToken, this.sessionToken);
            this.deviceEncryptionToken = (0, crypto_1.createEncryptionToken)(this.deviceSecret, this.sessionToken);
        });
    }
    /**
     * Discconects from JDownloaderAPI
     */
    disconnect() {
        return this.callServer('/my/disconnect', this.serverEncryptionToken, {
            sessiontoken: this.sessionToken
        }).then(() => {
            this.sessionToken = null;
            this.regainToken = null;
            this.serverEncryptionToken = null;
            this.deviceEncryptionToken = null;
        });
    }
    /**
     * List available devices connected to MyJDownloader
     */
    listDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkIfConnected();
            return this.callServer('/my/listdevices', this.serverEncryptionToken, {
                sessiontoken: this.sessionToken
            }).then(response => response.list);
        });
    }
    /**
     * Checks if the neccesary atributtes to query JDownloaderAPI are established
     */
    checkIfConnected() {
        if (!this.sessionToken ||
            !this.regainToken ||
            !this.serverEncryptionToken ||
            !this.deviceEncryptionToken) {
            throw new Error('You are not connected. First you must call "client.connect()"');
        }
    }
    /**
     * Call the device with an action
     * @param {string} query The query to make to the device
     * @param {Buffer} deviceId The ID of the device
     * @param {Object} params The parameters to the query
     */
    callDevice(query, deviceId, params = []) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkIfConnected();
            const rid = (0, utils_1.uniqueRid)();
            const body = (0, crypto_1.encrypt)(JSON.stringify(this.createBody(rid, query, params)), this.deviceEncryptionToken);
            return axios_1.default
                .post('https://api.jdownloader.org/t_' +
                encodeURI(this.sessionToken) +
                '_' +
                encodeURI(deviceId) +
                query, body)
                .then(response => (0, crypto_1.decrypt)(response.data, this.deviceEncryptionToken))
                .then(utils_1.parse)
                .then((0, utils_1.validateRid)(rid))
                .catch(utils_1.errorParser)
                .catch(err => {
                return Promise.reject(new Error((0, crypto_1.decrypt)(err.message, this.deviceEncryptionToken)));
            });
        });
    }
    createBody(rid, query, params) {
        const baseBody = {
            apiVer: this.apiVer,
            rid,
            url: query
        };
        return params.length > 0 ? Object.assign(Object.assign({}, baseBody), { params: params.map(p => JSON.stringify(p)) }) : baseBody;
    }
    /**
     * Call the server with an action
     * @param {string} query The query to make to the server
     * @param {Buffer} key The singing key
     * @param {Object} params The parameters to the query
     */
    callServer(query, key, params) {
        const rid = (0, utils_1.uniqueRid)();
        const path = query +
            '?' +
            querystring.stringify(Object.assign(Object.assign({}, params), { rid }));
        const signature = crypto
            .createHmac('sha256', key)
            .update(path)
            .digest('hex');
        return axios_1.default
            .post(`https://api.jdownloader.org${path}&signature=${signature}`)
            .then(response => (0, crypto_1.decrypt)(response.data, key))
            .then(utils_1.parse)
            .then((0, utils_1.validateRid)(rid))
            .catch(utils_1.errorParser);
    }
}
exports.JDownloaderCryptoSuite = JDownloaderCryptoSuite;
//# sourceMappingURL=jdownloader-crypto-suite.js.map