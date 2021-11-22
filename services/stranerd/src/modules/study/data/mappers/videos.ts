import { VideoFromModel, VideoToModel } from '../models/videos'
import { VideoEntity } from '../../domain/entities/videos'
import { BaseMapper } from '@utils/commons'

export class VideoMapper extends BaseMapper<VideoFromModel, VideoToModel, VideoEntity> {
	mapFrom (model: VideoFromModel | null) {
		if (!model) return null
		const {
			_id, title, description, tags, userId, userBio, isHosted, link, media,
			createdAt, updatedAt, preview
		} = model
		return new VideoEntity({
			id: _id.toString(), title, description, tags, userId, userBio,
			isHosted, link, media, createdAt, updatedAt, preview
		})
	}

	mapTo (entity: VideoEntity) {
		return {
			title: entity.title,
			description: entity.description,
			tags: entity.tags,
			userId: entity.userId,
			userBio: entity.userBio,
			isHosted: entity.isHosted,
			link: entity.link,
			media: entity.media,
			preview: entity.preview
		}
	}
}
