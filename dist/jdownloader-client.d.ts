import { IAddLinksQuery } from './interfaces/AddLinksQuery';
import { ICrawledLink } from './interfaces/CrawledLink';
import { ICrawledLinkQuery } from './interfaces/CrawledLinkQuery';
import { IDirectConnectionInfos } from './interfaces/DirectConnectionInfos';
import { IDownloadLink } from './interfaces/DownloadLink';
import { IFilePackage } from './interfaces/FilePackage';
import { ILinkCollectingJob } from './interfaces/LinkCollectingJob';
import { ILinkQuery } from './interfaces/LinkQuery';
import { IPackageQuery } from './interfaces/PackageQuery';
import { JDownloaderCryptoSuite } from './jdownloader-crypto-suite';
export declare class JDownloaderClient extends JDownloaderCryptoSuite {
    constructor(email: string, password: string, appKey?: string, apiVer?: number);
    /**
     * List links in the downloads section
     *
     * [Official docs](https://my.jdownloader.org/developers/#tag_143)
     * @param {string} deviceId The ID of the device
     */
    downloadsQueryLinks(deviceId: string, options?: ILinkQuery): Promise<IDownloadLink[]>;
    /**
     * List links in the link grabber section
     *
     * [Official docs](https://my.jdownloader.org/developers/#tag_267)
     * @param {string} deviceId The ID of the device
     */
    linkGrabberQueryLinks(deviceId: string, options?: ICrawledLinkQuery): Promise<ICrawledLink[]>;
    /**
     * TODO: Document this
     *
     * [Official docs](https://my.jdownloader.org/developers/#tag_80)
     * @param deviceId The ID of the device
     */
    getDirectConnectionInfos(deviceId: string): Promise<IDirectConnectionInfos>;
    /**
     * Adds links to the Link Grabber
     *
     * [Official docs](https://my.jdownloader.org/developers/#tag_245)
     * @param deviceId The ID of the device
     */
    linkGrabberAddLinks(deviceId: string, options: IAddLinksQuery): Promise<ILinkCollectingJob>;
    /**
     * TODO: document this
     *
     * [Official docs](https://my.jdownloader.org/developers/#tag_146)
     */
    downloadsQueryPackages(deviceId: string, options?: IPackageQuery): Promise<IFilePackage[]>;
    moveToDownloadlist(deviceId: string, linkIds?: number[], packageIds?: number[]): Promise<unknown>;
    linkGrabberRemoveLinks(deviceId: string, linkIds?: number[], packageIds?: number[]): Promise<unknown>;
    downloadsRemoveLinks(deviceId: string, linkIds?: number[], packageIds?: number[]): Promise<unknown>;
}
