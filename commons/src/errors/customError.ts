export abstract class CustomError extends Error {
	abstract statusCode: number;
	isCustomError = true

	protected constructor (message: string) {
		super(message)
	}

	abstract serializeErrors(): { message: string; field?: string }[];
}
