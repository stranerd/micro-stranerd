import { IUploaderRepository } from '../irepositories/uploader'
import { MediaInput } from '../../data/models/media'

export class UploadFileUseCase {
	private readonly uploader: IUploaderRepository

	constructor (uploader: IUploaderRepository) {
		this.uploader = uploader
	}

	async call (media: MediaInput) {
		return await this.uploader.upload(media)
	}
}