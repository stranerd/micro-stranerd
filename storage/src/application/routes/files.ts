import { BadRequestError, makeController, Route, StatusCodes } from '@utils/commons'
import { DeleteFile, UploadFile } from '@modules/domain'

const uploadFile: Route = {
	path: '/file',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			const file = req.files[0]
			if (!file) throw new BadRequestError('No file attached')
			const res = await UploadFile.call(file)
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
			if (!file) throw new BadRequestError('No file attached')
			const res = await Promise.all(
				req.files.map(async (f) => await UploadFile.call(f))
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
			if (!path) throw new BadRequestError('No path attached')
			await DeleteFile.call(path)
			return {
				status: StatusCodes.Ok,
				result: true
			}
		})
	]
}

const routes: Route[] = [uploadFile, uploadFiles, deleteFile]
export default routes