/**
 * Represents a validation error with a status code of 400.
 * Typically thrown when input data does not meet validation requirements.
 *
 * @extends Error
 * @property {number} status - The HTTP status code for validation errors (400).
 * @param {string} message - The error message describing the validation issue.
 */
export class ValidationError extends Error {
  status = 400;
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Represents a not found error with a status code of 404.
 * Typically thrown when a requested resource cannot be found.
 *
 * @extends Error
 * @property {number} status - The HTTP status code for not found errors (404).
 * @param {string} message - The error message describing the missing resource.
 */
export class NotFoundError extends Error {
  status = 404;
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}