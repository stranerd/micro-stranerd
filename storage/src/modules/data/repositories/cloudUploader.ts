import { IUploaderRepository } from '../../domain/irepositories/uploader'
import fs from 'fs'
import { MediaInput } from '../models/media'
import { environment } from '@utils/environment'
import { Bucket, Storage } from '@google-cloud/storage'
import { getRandomValue } from '@utils/commons'

export class CloudUploaderRepository implements IUploaderRepository {
	private bucket: Bucket

	constructor () {
		this.bucket = new Storage().bucket(`storage-${ environment }`)
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
		path = `storage/${ environment }/${ path }/${ timestamp }-${ media.name }`

		const tempFilePath = getRandomValue()
		fs.writeFileSync(tempFilePath, media.data)

		await this.bucket.upload(tempFilePath, {
			destination: path
		})

		const link = this.bucket.file(path).publicUrl()

		fs.unlinkSync(tempFilePath)

		return {
			name: media.name,
			type: media.type,
			size: media.size,
			path, timestamp, link
		}
	}
}