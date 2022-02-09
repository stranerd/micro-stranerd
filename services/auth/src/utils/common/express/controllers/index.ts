import { ErrorRequestHandler, Handler, NextFunction, Request, Response } from 'express'
import { Request as CustomRequest } from './request'
import { StatusCodes, SupportedStatusCodes } from '../statusCodes'
import { StorageFile } from '../../storage'

type CustomResponse = {
	status: SupportedStatusCodes,
	result: any
}

export type Controller = Handler | ErrorRequestHandler

export const makeController = (cb: (_: CustomRequest) => Promise<CustomResponse>): Controller => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { status = StatusCodes.Ok, result } = await cb(extractRequest(req))
			return res.status(status).json(result).end()
		} catch (e) {
			next(e)
			return
		}
	}
}

export const makeMiddleware = (cb: (_: CustomRequest) => Promise<void>): Controller => {
	return async (req: Request, _: Response, next: NextFunction) => {
		try {
			await cb(extractRequest(req))
			return next()
		} catch (e) {
			return next(e)
		}
	}
}

export const makeErrorMiddleware = (cb: (_: CustomRequest, __: Error) => Promise<CustomResponse>): Controller => {
	return async (err: Error, req: Request, res: Response, _: NextFunction) => {
		const { status = StatusCodes.BadRequest, result } = await cb(extractRequest(req), err)
		return res.status(status).json(result).end()
	}
}

const extractRequest = (req: Request) => {
	const headers = {
		AccessToken: req.get('Access-Token') ?? null,
		RefreshToken: req.get('Refresh-Token') ?? null,
		ContentType: req.get('Content-Type') ?? null,
		Referer: req.get('referer') ?? null,
		UserAgent: req.get('User-Agent') ?? null
	}
	// @ts-ignore
	const file = req.files?.file
	const fileArray: StorageFile[] = []
	if (file) {
		if (Array.isArray(file)) file.forEach((f) => fileArray.push({
			name: f.name,
			type: f.mimetype,
			size: f.size,
			isTruncated: f.truncated,
			data: f.data
		}))
		else fileArray.push({
			name: file.name,
			type: file.mimetype,
			size: file.size,
			isTruncated: file.truncated,
			data: file.data
		})
	}

	// @ts-ignore
	const request = req.savedReq ?? new CustomRequest({
		body: req.body ?? {},
		params: req.params ?? {},
		query: req.query ?? {},
		method: req.method,
		path: req.path,
		headers,
		files: fileArray,
		data: {}
	})
	// @ts-ignore
	req.savedReq = request

	return request
}