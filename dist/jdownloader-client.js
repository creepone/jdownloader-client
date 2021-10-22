"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jdownloader_crypto_suite_1 = require("./jdownloader-crypto-suite");
class JDownloaderClient extends jdownloader_crypto_suite_1.JDownloaderCryptoSuite {
    constructor(email, password, appKey = 'jdownloader-api-indev', apiVer = 1) {
        super({ email, password, appKey, apiVer });
    }
    /**
     * List links in the downloads section
     *
     * [Official docs](https://my.jdownloader.org/developers/#tag_143)
     * @param {string} deviceId The ID of the device
     */
    downloadsQueryLinks(deviceId, options = {}) {
        return this.callDevice('/downloadsV2/queryLinks', deviceId, [options]).then(response => response.data);
    }
    /**
     * List links in the link grabber section
     *
     * [Official docs](https://my.jdownloader.org/developers/#tag_267)
     * @param {string} deviceId The ID of the device
     */
    linkGrabberQueryLinks(deviceId, options = {}) {
        return this.callDevice('/linkgrabberv2/queryLinks', deviceId, [options]).then(response => response.data);
    }
    /**
     * TODO: Document this
     *
     * [Official docs](https://my.jdownloader.org/developers/#tag_80)
     * @param deviceId The ID of the device
     */
    getDirectConnectionInfos(deviceId) {
        return this.callDevice('/device/getDirectConnectionInfos', deviceId).then(response => response.data);
    }
    /**
     * Adds links to the Link Grabber
     *
     * [Official docs](https://my.jdownloader.org/developers/#tag_245)
     * @param deviceId The ID of the device
     */
    linkGrabberAddLinks(deviceId, options) {
        return this.callDevice('/linkgrabberv2/addLinks', deviceId, [Object.assign(Object.assign({}, options), { links: options.links.join(' ') })]).then(response => response.data);
    }
    /**
     * TODO: document this
     *
     * [Official docs](https://my.jdownloader.org/developers/#tag_146)
     */
    downloadsQueryPackages(deviceId, options = {}) {
        return this.callDevice('/downloadsV2/queryPackages', deviceId, [options]).then(response => response.data);
    }
    moveToDownloadlist(deviceId, linkIds = [], packageIds = []) {
        return this.callDevice('/linkgrabberv2/moveToDownloadlist', deviceId, [linkIds, packageIds]).then(response => response.data);
    }
    removeLinks(deviceId, linkIds = [], packageIds = []) {
        return this.callDevice('/linkgrabberv2/removeLinks', deviceId, [linkIds, packageIds]).then(response => response.data);
    }
}
exports.JDownloaderClient = JDownloaderClient;
//# sourceMappingURL=jdownloader-client.js.map