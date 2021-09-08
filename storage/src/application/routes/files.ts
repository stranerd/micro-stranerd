import { makeController, Route, StatusCodes, validate, Validation } from '@utils/commons'
import { UploadFile } from '@modules/domain'

const uploadFile: Route = {
	path: '/file',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			const file = req.files[0]
			const { path } = req.body
			const data = validate({ path, file }, {
				path: { required: true, rules: [] },
				file: {
					required: true, rules: [Validation.isFile, (_) => {
						if (file.isTruncated) return Validation.isInvalid('is larger than allowed limit')
						else return Validation.isValid()
					}]
				}
			})
			const res = await UploadFile.call(data.path, data.file)
			return {
				status: StatusCodes.Ok,
				result: res
			}
		})
	]
}

const uploadFiles: Route = {
	path: '/files',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			const areAllFiles: Validation.Rule = (value: any[]) => {
				const res = value.map(Validation.isFile)
				const valid = res.every((r) => r.valid)
				const error = res.find((r) => r.error)?.error!
				return valid ? { valid: true, error: undefined } : { valid: false, error }
			}
			const files = req.files
			const { path } = req.body
			const data = validate({ path, files }, {
				path: { required: true, rules: [] },
				files: {
					required: true, rules: [areAllFiles, (_) => {
						if (files.some((f) => f.isTruncated)) return Validation.isInvalid('are larger than allowed limit')
						return Validation.isValid()
					}]
				}
			})
			const res = await Promise.all(
				data.files.map(async (f) => await UploadFile.call(data.path, f))
			)
			return {
				status: StatusCodes.Ok,
				result: res
			}
		})
	]
}

const routes: Route[] = [uploadFile, uploadFiles]
export default routes