export class ArgumentException extends Error {
  readonly paramName?: string;

  constructor(message: string, paramName?: string) {
    super(message);
    this.name = 'ArgumentException';
    this.paramName = paramName;
    Object.setPrototypeOf(this, ArgumentException.prototype);
  }
}

export class FormatException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FormatException';
    Object.setPrototypeOf(this, FormatException.prototype);
  }
}

export class ArgumentOutOfRangeException extends RangeError {
  readonly paramName?: string;

  constructor(message: string, paramName?: string) {
    super(message);
    this.name = 'ArgumentOutOfRangeException';
    this.paramName = paramName;
    Object.setPrototypeOf(this, ArgumentOutOfRangeException.prototype);
  }
}
