import { MediaInput, MediaOutput } from '../../data/models/media'

export interface IUploaderRepository {
	upload: (_: MediaInput) => Promise<MediaOutput>
	delete: (_: string) => Promise<void>
}