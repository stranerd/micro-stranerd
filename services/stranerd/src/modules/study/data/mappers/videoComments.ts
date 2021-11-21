import { VideoCommentFromModel, VideoCommentToModel } from '../models/videoComments'
import { VideoCommentEntity } from '../../domain/entities/videoComments'
import { BaseMapper } from '@utils/commons'

export class VideoCommentMapper extends BaseMapper<VideoCommentFromModel, VideoCommentToModel, VideoCommentEntity> {
	mapFrom (model: VideoCommentFromModel | null) {
		if (!model) return null
		const {
			_id, body, userId, userBio, videoId,
			createdAt, updatedAt
		} = model
		return new VideoCommentEntity({
			id: _id.toString(), body, userId, userBio, videoId,
			createdAt, updatedAt
		})
	}

	mapTo (entity: VideoCommentEntity) {
		return {
			body: entity.body,
			userId: entity.userId,
			userBio: entity.userBio,
			videoId: entity.videoId
		}
	}
}
