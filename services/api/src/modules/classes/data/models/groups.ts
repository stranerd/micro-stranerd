import { ClassUsers, EmbeddedUser } from '../../domain/types'

export interface GroupFromModel extends GroupToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface GroupToModel {
	classId: string
	user: EmbeddedUser
	name: string
	users: Record<ClassUsers, string[]>
}