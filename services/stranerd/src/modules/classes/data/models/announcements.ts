import { ClassUsers, UserBio, UserRoles } from '../../domain/types'

export interface AnnouncementFromModel extends AnnouncementToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface AnnouncementToModel {
	classId: string
	users: Record<ClassUsers, string[]>
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	body: string
}