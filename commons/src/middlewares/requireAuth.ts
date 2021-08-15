import { Request, Response, NextFunction } from 'express'
import { NotAuthorizedError, makeMiddleware } from '../'

export const requireAuth = (
	req: Request,
	res: Response,
	next: NextFunction
) => makeMiddleware(
	req,
	res,
	async (request) => {
		if (!request.user) throw new NotAuthorizedError()
	},
	next
)
