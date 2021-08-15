import { Request, Response, NextFunction } from 'express'
import { makeMiddleware, CustomError } from '../'

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => makeMiddleware(
	req,
	res,
	async () => {
		if (err instanceof CustomError) {
			res.status(err.statusCode).json({ errors: err.serializeErrors() })
			return
		}
		res.status(400).json({
			errors: [{ message: 'Something went wrong', data: err.message }],
		})
	},
	next
)
