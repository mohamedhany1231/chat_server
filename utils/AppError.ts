export default class extends Error {
  public isOperational = true;
  constructor(
    public statusCode: number = 500,
    message: string = "something went wrong"
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
