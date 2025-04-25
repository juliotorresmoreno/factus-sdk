export interface DataError {
  message: string;
  errors: {
    [x: string]: string | string[];
  };
}

export class ApiError extends Error {
  status: number;
  message: string;
  data?: DataError;

  constructor(status: number, message: string, data?: DataError) {
    super(message);
    this.status = status;
    this.message = message;
  }

  toString() {
    return `Error ${this.status}: ${this.message}`;
  }
}
