import { AnnouncementEntity } from '../entities/announcements'
import { AnnouncementToModel } from '../../data/models/announcements'
import { QueryParams, QueryResults } from '@utils/commons'
import { ClassUsers, EmbeddedUser } from '../types'

export interface IAnnouncementRepository {
	add: (data: AnnouncementToModel) => Promise<AnnouncementEntity>
	get: (condition: QueryParams) => Promise<QueryResults<AnnouncementEntity>>
	find: (classId: string, id: string, userId: string) => Promise<AnnouncementEntity | null>
	update: (classId: string, id: string, userId: string, data: Partial<AnnouncementToModel>) => Promise<AnnouncementEntity | null>
	delete: (classId: string, id: string, userId: string) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
	updateUsers: (classId: string, users: Record<ClassUsers, string[]>) => Promise<boolean>
	deleteClassAnnouncements: (classId: string) => Promise<boolean>
	markRead: (classId: string, userId: string) => Promise<boolean>
}