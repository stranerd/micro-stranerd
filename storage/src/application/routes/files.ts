import { makeController, Route, StatusCodes, ValidationError } from '@utils/commons'
import { DeleteFile, UploadFile } from '@modules/domain'

const uploadFile: Route = {
	path: '/file',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			const file = req.files[0]
			const { path } = req.body
			if (!file) throw new ValidationError([{ field: 'file', message: 'No file attached' }])
			if (!path) throw new ValidationError([{ field: 'path', message: 'No path attached' }])
			if (file.isTruncated) throw new ValidationError([{
				field: 'file',
				message: 'File is larger than allowed limit'
			}])
			const res = await UploadFile.call(path, file)
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
			const file = req.files[0]
			const { path } = req.body
			if (!file) throw new ValidationError([{ field: 'file', message: 'No file attached' }])
			if (!path) throw new ValidationError([{ field: 'path', message: 'No path attached' }])
			if (req.files.some((f) => f.isTruncated)) throw new ValidationError([{
				field: 'file',
				message: 'Some files are larger than allowed limit'
			}])
			const res = await Promise.all(
				req.files.map(async (f) => await UploadFile.call(path, f))
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
			if (!path) throw new ValidationError([{ field: 'path', message: 'No path attached' }])
			const res = await DeleteFile.call(path)
			return {
				status: StatusCodes.Ok,
				result: res
			}
		})
	]
}

const routes: Route[] = [uploadFile, uploadFiles, deleteFile]
export default routes