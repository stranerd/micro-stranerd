import { NextFunction, Request, Response } from 'express'
import { Request as CustomRequest } from './request'

type CustomResponse = {
	status?: number,
	result: Record<string, any>
}

type CustomMiddlewareResponse = {
	status?: number,
	result: Record<string, any>
} | void

type Callback = (_: CustomRequest) => Promise<CustomResponse>
type MethodTypes = 'get' | 'post' | 'put' | 'delete' | 'all'

export const makeCallback = (cb: Callback) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { status = 200, result } = await cb(extractRequest(req))
			return res.status(status).json(result)
		} catch (e) { return next(e) }
	}
}

export const makeController = ({ path, cb, method }: { path: string, method: MethodTypes, cb: Callback }) => ({ path, method, controller: makeCallback(cb) })

export const makeMiddleware = (cb: (_: CustomRequest, __?: Error) => Promise<CustomMiddlewareResponse>) => {
	return async (err: Error, req: Request, res: Response, next: NextFunction) => {
		if (err) return next(err)
		try {
			const ret = await cb(extractRequest(req), err)
			if (ret) return res.status(ret.status ?? 200).json(ret.result)
			else return next()
		} catch (e) { return next(e) }
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