import { VideoCommentToModel } from '../../data/models/videoComments'
import { VideoCommentEntity } from '../entities/videoComments'
import { QueryParams, QueryResults } from '@utils/commons'
import { UserBio } from '../types'

export interface IVideoCommentRepository {
	add: (data: VideoCommentToModel) => Promise<VideoCommentEntity>
	get: (query: QueryParams) => Promise<QueryResults<VideoCommentEntity>>
	find: (id: string) => Promise<VideoCommentEntity | null>
	deleteVideoComments: (videoId: string) => Promise<boolean>
	updateVideoCommentsUserBio: (userId: string, userBio: UserBio) => Promise<boolean>
}
