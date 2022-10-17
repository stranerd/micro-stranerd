import { EmbeddedUser } from '../../domain/types'

export interface CourseFromModel extends CourseToModel {
	_id: string
	members: string[]
	createdAt: number
	updatedAt: number
}

export interface CourseToModel {
	title: string
	level: string
	user: EmbeddedUser
}