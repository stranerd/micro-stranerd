export enum StatusCodes {
	Ok = 200,
	BadRequest = 400,
	NotAuthenticated = 401,
	NotAuthorized = 403,
	NotFound = 404,
	ValidationError = 422,
	DatabaseConnectionError = 500,
	EmailNotVerified = 460,
	AccessTokenExpired = 461
}

export type SupportedStatusCodes = 200 | 400 | 401 | 403 | 404 | 422 | 460 | 461 | 500