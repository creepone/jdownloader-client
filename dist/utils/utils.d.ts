export declare function parse(JSONstr: string): any;
export declare function uniqueRid(): number;
export declare function validateRid(rid: number): (data: {
    [key: string]: any;
    rid: number;
}) => {
    [key: string]: any;
    rid: number;
};
export declare function errorParser(err: any): Promise<never>;
