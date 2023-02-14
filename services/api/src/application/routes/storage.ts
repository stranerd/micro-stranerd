import { makeController, Route, StatusCodes, StorageFile, validate, Validation } from '@utils/app/package'
import { UploaderUseCases } from '@modules/storage'

const uploadFile: Route = {
	path: '/storage/file',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			const file = req.files.file?.[0]
			const { path } = req.body
			const data = validate({ path, file }, {
				path: { required: true, rules: [Validation.isString(), Validation.isMinOf(1)] },
				file: {
					required: true, rules: [Validation.isFile(), (val) => {
						if (file?.isTruncated) return Validation.isInvalid(['is larger than allowed limit'], val)
						else return Validation.isValid(val)
					}]
				}
			})
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
			const files = req.files.file ?? []
			const data = validate({ path: req.body.path, files }, {
				path: { required: true, rules: [Validation.isString(), Validation.isMinOf(1)] },
				files: {
					required: true,
					rules: [
						Validation.isArrayOf((cur: StorageFile) => Validation.isFile()(cur).valid, 'files'),
						Validation.isArrayOf((cur: StorageFile) => !cur?.isTruncated, 'less than the allowed limit')
					]
				}
			})
			const res = await UploaderUseCases.uploadMany(data.path, data.files)
			return {
				status: StatusCodes.Ok,
				result: res
			}
		})
	]
}

export const storageRoutes: Route[] = [uploadFile, uploadFiles]
