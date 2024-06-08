class AppError extends Error {
  public statusCode: number;

  constructor(
    statusCode: number,

    messege: string,
    stack = ""
  ) {
    super(messege);
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default AppError;
