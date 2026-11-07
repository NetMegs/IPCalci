"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentOutOfRangeException = exports.FormatException = exports.ArgumentException = void 0;
class ArgumentException extends Error {
    paramName;
    constructor(message, paramName) {
        super(message);
        this.name = 'ArgumentException';
        this.paramName = paramName;
        Object.setPrototypeOf(this, ArgumentException.prototype);
    }
}
exports.ArgumentException = ArgumentException;
class FormatException extends Error {
    constructor(message) {
        super(message);
        this.name = 'FormatException';
        Object.setPrototypeOf(this, FormatException.prototype);
    }
}
exports.FormatException = FormatException;
class ArgumentOutOfRangeException extends RangeError {
    paramName;
    constructor(message, paramName) {
        super(message);
        this.name = 'ArgumentOutOfRangeException';
        this.paramName = paramName;
        Object.setPrototypeOf(this, ArgumentOutOfRangeException.prototype);
    }
}
exports.ArgumentOutOfRangeException = ArgumentOutOfRangeException;
//# sourceMappingURL=errors.js.map