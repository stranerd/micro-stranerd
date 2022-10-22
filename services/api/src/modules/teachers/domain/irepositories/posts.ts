import { PostEntity } from '../entities/posts'
import { PostToModel } from '../../data/models/posts'
import { QueryParams, QueryResults } from '@utils/app/package'
import { EmbeddedUser, PostMetaType } from '../types'

export interface IPostRepository {
	add: (data: PostToModel) => Promise<PostEntity>
	get: (condition: QueryParams) => Promise<QueryResults<PostEntity>>
	find: (id: string) => Promise<PostEntity | null>
	update: (courseId: string, id: string, userId: string, data: Partial<PostToModel>) => Promise<PostEntity | null>
	delete: (courseId: string, id: string, userId: string) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
	updateMembers: (courseId: string, members: string[]) => Promise<boolean>
	deleteCoursePosts: (courseId: string) => Promise<boolean>
	updateMeta: (id: string, property: PostMetaType, value: 1 | -1) => Promise<boolean>
}