import { IUploaderRepository } from '../../domain/irepositories/uploader'
import { MediaInput } from '../models/media'
import { dirname, join, resolve } from 'path'
import fs from 'fs'

export class LocalUploaderRepository implements IUploaderRepository {
	async delete (path: string) {
		const mediaPath = resolve(path)
		if (fs.existsSync(mediaPath)) fs.unlinkSync(mediaPath)
	}

	async upload (media: MediaInput) {
		const timestamp = Date.now()
		media.name = media.name.toLowerCase()
		const path = `public/storage/${ timestamp }-${ media.name }`
		const mediaPath = resolve(join(process.cwd(), path))
		const folder = dirname(mediaPath)
		if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true })
		fs.writeFileSync(path, media.data)
		return {
			name: media.name,
			mimeType: media.mimeType,
			size: media.size,
			path, timestamp
		}
	}
}