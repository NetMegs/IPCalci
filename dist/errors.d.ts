export declare class ArgumentException extends Error {
    readonly paramName?: string;
    constructor(message: string, paramName?: string);
}
export declare class FormatException extends Error {
    constructor(message: string);
}
export declare class ArgumentOutOfRangeException extends RangeError {
    readonly paramName?: string;
    constructor(message: string, paramName?: string);
}
//# sourceMappingURL=errors.d.ts.map