import { ClassUsers, EmbeddedUser } from '../../domain/types'

export interface AnnouncementFromModel extends AnnouncementToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface AnnouncementToModel {
	classId: string
	users: Record<ClassUsers, string[]>
	user: EmbeddedUser
	body: string
}