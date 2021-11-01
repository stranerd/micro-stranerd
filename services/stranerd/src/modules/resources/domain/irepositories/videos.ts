import { VideoEntity } from '../entities/videos'
import { VideoToModel } from '../../data/models/videos'
import { QueryParams, QueryResults } from '@utils/commons'
import { UserBio } from '../types'

export interface IVideoRepository {
	add: (data: VideoToModel) => Promise<VideoEntity>
	get: (condition: QueryParams) => Promise<QueryResults<VideoEntity>>
	find: (id: string) => Promise<VideoEntity | null>
	update: (id: string, userId: string, data: Partial<VideoToModel>) => Promise<VideoEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateVideosUserBio: (userId: string, userBio: UserBio) => Promise<boolean>
	updateCommentsCount: (id: string, add: boolean) => Promise<boolean>
}