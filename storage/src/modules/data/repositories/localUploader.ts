import { IUploaderRepository } from '../../domain/irepositories/uploader'
import { dirname, join, resolve } from 'path'
import fs from 'fs'

export class LocalUploaderRepository implements IUploaderRepository {
	async delete (path: string) {
		const mediaPath = resolve(join(process.cwd(), 'public', decodeURI(path)))
		const exists = fs.existsSync(mediaPath)
		if (exists) fs.unlinkSync(mediaPath)
		return exists
	}

	async upload (path, media) {
		const timestamp = Date.now()
		media.name = media.name.toLowerCase()
		path = `storage/${ path }/${ timestamp }-${ media.name }`
		const mediaPath = resolve(join(process.cwd(), 'public', path))
		const folder = dirname(mediaPath)
		if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true })
		fs.writeFileSync(mediaPath, media.data)
		return {
			name: media.name,
			mimeType: media.mimeType,
			size: media.size,
			path: encodeURI(`/${ path }`), timestamp
		}
	}
}