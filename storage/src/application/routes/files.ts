import { makeController, Route, StatusCodes, validate, ValidationError } from '@utils/commons'
import { DeleteFile, UploadFile } from '@modules/domain'
import { Validation } from '@stranerd/api-commons'

const uploadFile: Route = {
	path: '/file',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			const file = req.files[0]
			const { path } = req.body
			const data = validate({ path, file }, {
				path: { required: true, rules: [] },
				file: { required: true, rules: [Validation.isFile] }
			})
			if (file.isTruncated) throw new ValidationError([{
				field: 'file',
				messages: ['is larger than allowed limit']
			}])
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
			const areAllImages = (value: any[]) => {
				const res = value.map(Validation.isImage)
				const valid = res.every((r) => r.valid)
				const error = res.find((r) => r.error)?.error
				return { valid, error }
			}
			const files = req.files
			const { path } = req.body
			const data = validate({ path, files }, {
				path: { required: true, rules: [] },
				files: { required: true, rules: [areAllImages] }
			})
			if (files.some((f) => f.isTruncated)) throw new ValidationError([{
				field: 'file',
				messages: ['are larger than allowed limit']
			}])
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

const deleteFile: Route = {
	path: '/file',
	method: 'delete',
	controllers: [
		makeController(async (req) => {
			const { path } = req.body
			const data = validate({ path }, {
				path: { required: true, rules: [] }
			})
			const res = await DeleteFile.call(data.path)
			return {
				status: StatusCodes.Ok,
				result: res
			}
		})
	]
}

const routes: Route[] = [uploadFile, uploadFiles, deleteFile]
export default routes