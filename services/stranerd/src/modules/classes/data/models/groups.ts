import { ClassUsers, UserBio, UserRoles } from '../../domain/types'
import { DiscussionFromModel } from './discussions'

export interface GroupFromModel extends GroupToModel {
	_id: string
	last: DiscussionFromModel | null
	createdAt: number
	updatedAt: number
}

export interface GroupToModel {
	classId: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	name: string
	users: Record<ClassUsers, string[]>
}