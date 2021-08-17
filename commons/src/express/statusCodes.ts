export enum StatusCodes {
	Ok = 200,
	BadRequest = 400,
	NotAuthorized = 401,
	NotFound = 404,
	AccessTokenExpired = 420,
	ValidationError = 422,
	DatabaseConnectionError = 500
}

export type SupportedStatusCodes = 200 | 400 | 401 | 404 | 420 | 422 | 500