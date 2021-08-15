import { NextFunction, Request, Response } from 'express'
import { Request as CustomRequest } from './request'

export const makeController = (
	req: Request,
	res: Response,
	cb: (_: CustomRequest) => Promise<Record<string, any>>,
	next: NextFunction
) => {
	return async () => {
		try {
			const result = await cb(extractHeaders(req))
			return res.json(result)
		} catch (e) { return next(e) }
	}
}

export const makeMiddleware = (
	req: Request,
	res: Response,
	cb: (_: CustomRequest) => Promise<void>,
	next: NextFunction
) => {
	return async () => {
		try {
			await cb(extractHeaders(req))
			return next()
		} catch (e) { return next(e) }
	}
}

const extractHeaders = (req: Request) => new CustomRequest({
	body: req.body ?? {},
	params: req.params ?? {},
	query: req.query ?? {},
	method: req.method,
	path: req.path,
	headers: {
		AccessToken: req.get('Access-Token') ?? null,
		RefreshToken: req.get('Refresh-Token') ?? null,
		ContentType: req.get('Content-Type') ?? null,
		Referer: req.get('referer') ?? null,
		UserAgent: req.get('User-Agent') ?? null
	}
})