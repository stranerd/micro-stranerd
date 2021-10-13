import { IVideoCommentRepository } from '../../domain/irepositories/videoComments'
import { VideoCommentMapper } from '../mappers/videoComments'
import { VideoCommentFromModel, VideoCommentToModel } from '../models/videoComments'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { VideoComment } from '../mongooseModels/videoComments'
import { UserBio } from '../../domain/types'

export class VideoCommentRepository implements IVideoCommentRepository {
	private static instance: VideoCommentRepository
	private mapper: VideoCommentMapper

	private constructor () {
		this.mapper = new VideoCommentMapper()
	}

	static getInstance () {
		if (!VideoCommentRepository.instance) VideoCommentRepository.instance = new VideoCommentRepository()
		return VideoCommentRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<VideoCommentFromModel>(VideoComment, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: VideoCommentToModel) {
		const comment = await new VideoComment(data).save()
		return this.mapper.mapFrom(comment)!
	}

	async find (id: string) {
		const comment = await VideoComment.findById(id)
		return this.mapper.mapFrom(comment)
	}

	async deleteVideoComments (videoId: string) {
		const comments = await VideoComment.deleteMany({ videoId })
		return !!comments.acknowledged
	}

	async updateVideoCommentsUserBio (userId: string, userBio: UserBio) {
		const comments = await VideoComment.updateMany({ userId }, { $set: { userBio } })
		return !!comments.acknowledged
	}
}
