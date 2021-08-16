import { NextFunction, Request, Response, Handler, ErrorRequestHandler } from 'express'
import { Request as CustomRequest } from './request'

type CustomResponse = {
	status?: number,
	result: any
}

export type Controller = Handler | ErrorRequestHandler

export const makeController = (cb: (_: CustomRequest) => Promise<CustomResponse>) :Controller => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { status = 200, result } = await cb(extractRequest(req))
			res.status(status).json({ data: result })
		} catch (e) { next(e) }
	}
}

export const makeMiddleware = (cb: (_: CustomRequest) => Promise<void>) :Controller => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await cb(extractRequest(req))
			next()
		} catch (e) { return next(e) }
	}
}

export const makeErrorMiddleware = (cb: (_: CustomRequest, __: Error) => Promise<CustomResponse>) :Controller => {
	return async (err: Error, req: Request, res: Response, _: NextFunction) => {
		try {
			const ret = await cb(extractRequest(req), err)
			res.status(ret.status ?? 400).json(ret.result)
		} catch (e) { res.status(400).json({ errors: [{ message: 'Something unexpected happened.' }] }) }
	}
}

const extractRequest = (req: Request) => new CustomRequest({
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