import { ClassUsers, EmbeddedUser } from '../../domain/types'

export interface SchemeFromModel extends SchemeToModel {
	_id: string
	readAt: Record<string, number>
	createdAt: number
	updatedAt: number
}

export interface SchemeToModel {
	classId: string
	user: EmbeddedUser
	title: string
	topic: string
	start: number
	end: number
	users: Record<ClassUsers, string[]>
}