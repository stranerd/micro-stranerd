import { UploaderUseCases } from '@modules/storage'
import { makeController, Route, Schema, StatusCodes, validateReq } from '@utils/app/package'

const uploadFile: Route = {
	path: '/storage/file',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			const data = validateReq({
				path: Schema.string().min(1),
				file: Schema.file()
			}, { ...req.body, file: req.files.file?.[0] ?? null })
			const res = await UploaderUseCases.upload(data.path, data.file)
			return {
				status: StatusCodes.Ok,
				result: res
			}
		})
	]
}

const uploadFiles: Route = {
	path: '/storage/files',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			const data = validateReq({
				path: Schema.string().min(1),
				files: Schema.array(Schema.file())
			}, { ...req.body, files: req.files.file ?? [] })
			const res = await UploaderUseCases.uploadMany(data.path, data.files)
			return {
				status: StatusCodes.Ok,
				result: res
			}
		})
	]
}

export const storageRoutes: Route[] = [uploadFile, uploadFiles]
