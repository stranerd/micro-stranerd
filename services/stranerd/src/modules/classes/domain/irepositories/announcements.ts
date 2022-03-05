import { AnnouncementEntity } from '../entities/announcements'
import { AnnouncementToModel } from '../../data/models/announcements'
import { QueryParams, QueryResults } from '@utils/commons'
import { ClassUsers, UserBio, UserRoles } from '../types'

export interface IAnnouncementRepository {
	add: (data: AnnouncementToModel) => Promise<AnnouncementEntity>
	get: (condition: QueryParams) => Promise<QueryResults<AnnouncementEntity>>
	find: (id: string) => Promise<AnnouncementEntity | null>
	update: (id: string, userId: string, data: Partial<AnnouncementToModel>) => Promise<AnnouncementEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateAnnouncementsUserBio: (userId: string, userBio: UserBio, userRoles: UserRoles) => Promise<boolean>
	updateAnnouncementsUsers: (classId: string, users: Record<ClassUsers, string[]>) => Promise<boolean>
	deleteClassAnnouncements: (classId: string) => Promise<boolean>
}