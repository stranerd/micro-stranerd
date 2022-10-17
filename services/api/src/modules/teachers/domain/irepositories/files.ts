import { FileEntity } from '../entities/files'
import { FileToModel } from '../../data/models/files'
import { QueryParams, QueryResults } from '@utils/app/package'
import { EmbeddedUser } from '../types'

export interface IFileRepository {
	add: (data: FileToModel) => Promise<FileEntity>
	get: (condition: QueryParams) => Promise<QueryResults<FileEntity>>
	find: (id: string) => Promise<FileEntity | null>
	update: (id: string, userId: string, data: Partial<FileToModel>) => Promise<FileEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
	updateMembers: (courseId: string, members: string[]) => Promise<boolean>
	deleteCourseFiles: (courseId: string) => Promise<boolean>
}