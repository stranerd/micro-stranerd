import { ClassUsers, EmbeddedUser, Media } from '../../domain/types'

export interface ClassFromModel extends ClassToModel {
	_id: string
	users: Record<ClassUsers, string[]>
	requests: string[]
	createdAt: number
	updatedAt: number
}

export interface ClassToModel {
	name: string
	description: string
	photo: Media | null
	coverPhoto: Media | null
	courses: string[]
	user: EmbeddedUser
}