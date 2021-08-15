import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { makeMiddleware } from '../'

export const parseLoggedInUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => makeMiddleware(
	req,
	res,
	async (request) => {
		const accessToken = request.headers.AccessToken
		if (!accessToken) return
		request.user = jwt.verify(accessToken, process.env.JWT_KEY!) as typeof request['user']
	},
	next
)
