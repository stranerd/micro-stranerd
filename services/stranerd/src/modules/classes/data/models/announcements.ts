import { UserBio, UserRoles } from '../../domain/types'

export interface AnnouncementFromModel extends AnnouncementToModel {
	_id: string
	admins: string[]
	createdAt: number
	updatedAt: number
}

export interface AnnouncementToModel {
	classId: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	body: string
}