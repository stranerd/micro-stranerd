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
			const { status = 200, result } = await cb(extractRequest(req))
			res.status(status).json({ data: result })
		} catch (e) {
			next(e)
		}
	}
}

export const makeMiddleware = (cb: (_: CustomRequest) => Promise<void>): Controller => {
	return async (req: Request, _: Response, next: NextFunction) => {
		try {
			await cb(extractRequest(req))
			next()
		} catch (e) {
			return next(e)
		}
	}
}

export const makeErrorMiddleware = (cb: (_: CustomRequest, __: Error) => Promise<CustomResponse>): Controller => {
	return async (err: Error, req: Request, res: Response, _: NextFunction) => {
		try {
			const ret = await cb(extractRequest(req), err)
			res.status(ret.status ?? StatusCodes.BadRequest).json(ret.result)
		} catch (e) {
			res.status(400).json({ errors: [{ message: 'Something unexpected happened.' }] })
		}
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
	const file = req.files?.file
	const fileArray: StorageFile[] = []
	if (file) {
		if (Array.isArray(file)) file.forEach((f) => fileArray.push({
			name: f.name,
			mimeType: f.mimetype,
			size: f.size,
			isTruncated: f.truncated,
			data: f.data
		}))
		else {
			fileArray.push({
				name: file.name,
				mimeType: file.mimetype,
				size: file.size,
				isTruncated: file.truncated,
				data: file.data
			})
		}
	}

	return new CustomRequest({
		body: req.body ?? {},
		params: req.params ?? {},
		query: req.query ?? {},
		method: req.method,
		path: req.path,
		headers,
		files: fileArray
	})
}