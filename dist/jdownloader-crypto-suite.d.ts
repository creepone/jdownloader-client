export interface IConnectResponse {
    sessiontoken: string;
    regaintoken: string;
    rid: number;
}
export declare enum DeviceStatus {
    UNKNOWN = "UNKNOWN"
}
export interface IDevice {
    id: string;
    type: 'jd';
    name: string;
    status: DeviceStatus;
}
export declare class JDownloaderCryptoSuite {
    private loginSecret;
    private deviceSecret;
    private sessionToken;
    private regainToken;
    private serverEncryptionToken;
    private deviceEncryptionToken;
    private email;
    private appKey;
    private apiVer;
    constructor({ email, password, appKey, apiVer }: {
        email: string;
        password: string;
        appKey?: string;
        apiVer?: number;
    });
    /**
     * Connect to MyJDownloader with the credentils provided in the constructor
     */
    connect(): Promise<void>;
    /**
     * Reconnects to MyJDownloader with the credentils provided in the constructor
     */
    reconnect(): Promise<void>;
    /**
     * Discconects from JDownloaderAPI
     */
    disconnect(): Promise<void>;
    /**
     * List available devices connected to MyJDownloader
     */
    listDevices(): Promise<IDevice[]>;
    /**
     * Checks if the neccesary atributtes to query JDownloaderAPI are established
     */
    protected checkIfConnected(): void;
    /**
     * Call the device with an action
     * @param {string} query The query to make to the device
     * @param {Buffer} deviceId The ID of the device
     * @param {Object} params The parameters to the query
     */
    protected callDevice(query: string, deviceId: string, params?: object[]): Promise<any>;
    private createBody;
    /**
     * Call the server with an action
     * @param {string} query The query to make to the server
     * @param {Buffer} key The singing key
     * @param {Object} params The parameters to the query
     */
    private callServer;
}
