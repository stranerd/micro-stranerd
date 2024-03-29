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
	school: {
		institutionId: string
		facultyId: string
		departmentId: string
		year: number
	}
	description: string
	photo: Media | null
	courses: string[]
	user: EmbeddedUser
}