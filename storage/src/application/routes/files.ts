import { makeController, Route, StatusCodes, StorageFile, validate, Validation } from '@utils/commons'
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
			const files = req.files
			const data = validate({ path: req.body.path, files }, {
				path: { required: true, rules: [] },
				files: {
					required: true,
					rules: [
						Validation.isArrayOfX((cur: StorageFile) => Validation.isFile(cur).valid, 'files'),
						Validation.isArrayOfX((cur: StorageFile) => !cur.isTruncated, 'less than the allowed limit')
					]
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