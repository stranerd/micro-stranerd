export enum StatusCodes {
	Ok = 200,
	BadRequest = 400,
	NotAuthenticated = 401,
	NotAuthorized = 403,
	NotFound = 404,
	ValidationError = 422,
	TooManyRequests = 429,
	DatabaseConnectionError = 500,
	AccountNotVerified = 460,
	AccessTokenExpired = 461,
	RefreshTokenMisused = 462,
	InvalidToken = 463
}

export type SupportedStatusCodes = 200 | 400 | 401 | 403 | 404 | 422 | 429 | 460 | 461 | 462 | 463 | 500