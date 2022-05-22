import { ClassUsers, EmbeddedUser } from '../../domain/types'
import { DiscussionFromModel } from './discussions'

export interface GroupFromModel extends GroupToModel {
	_id: string
	last: DiscussionFromModel | null
	readAt: Record<string, number>
	createdAt: number
	updatedAt: number
}

export interface GroupToModel {
	classId: string
	user: EmbeddedUser
	name: string
	users: Record<ClassUsers, string[]>
}