/// <reference types="node" />
export declare function sha256(data: string | Buffer): Buffer;
export declare function createEncryptionToken(oldTokenBuff: Buffer, updateToken: string): Buffer;
export declare function encrypt(data: string, ivKey: Buffer): string;
export declare function decrypt(data: string, ivKey: Buffer): string;
