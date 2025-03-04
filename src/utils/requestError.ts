// General custom error (abstract class)
abstract class CustomError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  // Standardized error response structure
  serializeErrors(): { message: string } {
    return { message: this.message };
  }
}

// BadRequest Error (400)
class BadRequest extends CustomError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

// Unauthorized Error (401)
class Unauthorized extends CustomError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

// Forbidden Error (403)
class Forbidden extends CustomError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

// NotFound Error (404)
class NotFound extends CustomError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

export { CustomError, BadRequest, Unauthorized, Forbidden, NotFound };
