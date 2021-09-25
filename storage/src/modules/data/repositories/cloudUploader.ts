import { IUploaderRepository } from '../../domain/irepositories/uploader'
import { MediaInput } from '../models/media'
import { environment } from '@utils/environment'
import { Bucket, Storage } from '@google-cloud/storage'

export class CloudUploaderRepository implements IUploaderRepository {
	private bucket: Bucket

	constructor () {
		this.bucket = new Storage().bucket(`stranerd${environment}.appspot.com`)
	}

	async delete (path: string) {
		const file = this.bucket.file(path)
		const exists = (await file.exists())[0]
		if (exists) await file.delete()
		return exists
	}

	async upload (path: string, media: MediaInput) {
		const timestamp = Date.now()
		media.name = media.name.toLowerCase()
		path = `storage/${environment}/${path}/${timestamp}-${media.name}`

		const file = this.bucket.file(path)

		await file.save(media.data)

		const link = file.publicUrl()

		return {
			name: media.name,
			type: media.type,
			size: media.size,
			path, timestamp, link
		}
	}
}