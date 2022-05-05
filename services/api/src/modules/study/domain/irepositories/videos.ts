import { VideoEntity } from '../entities/videos'
import { VideoToModel } from '../../data/models/videos'
import { QueryParams, QueryResults } from '@utils/commons'
import { EmbeddedUser } from '../types'

export interface IVideoRepository {
	add: (data: VideoToModel) => Promise<VideoEntity>
	get: (condition: QueryParams) => Promise<QueryResults<VideoEntity>>
	find: (id: string) => Promise<VideoEntity | null>
	update: (id: string, userId: string, data: Partial<VideoToModel>) => Promise<VideoEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
}