export class ApiError extends Error {
  status: number;
  message: string;
  details?: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }

  toString() {
    return `Error ${this.status}: ${this.message}`;
  }
}
