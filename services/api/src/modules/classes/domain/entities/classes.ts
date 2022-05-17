import { ClassUsers, EmbeddedUser, Media } from '../types'
import { BaseEntity } from '@utils/commons'

export class ClassEntity extends BaseEntity {
	public readonly id: string
	public readonly user: EmbeddedUser
	public readonly name: string
	public readonly school: {
		institutionId: string
		facultyId: string
		departmentId: string
	}
	public readonly description: string
	public readonly photo: Media | null
	public readonly coverPhoto: Media | null
	public readonly users: Record<ClassUsers, string[]>
	public readonly requests: string[]
	public readonly courses: string[]
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             user,
		             name,
		             school,
		             description,
		             photo,
		             coverPhoto,
		             users,
		             requests,
		             courses,
		             createdAt,
		             updatedAt
	             }: ClassConstructorArgs) {
		super()
		this.id = id
		this.user = user
		this.name = name
		this.school = school
		this.description = description
		this.photo = photo
		this.coverPhoto = coverPhoto
		this.users = users
		this.requests = requests
		this.courses = courses
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	getAllUsers () {
		return Array.from(new Set(Object.values(this.users).flat()))
	}
}

type ClassConstructorArgs = {
	id: string,
	user: EmbeddedUser
	name: string
	school: {
		institutionId: string
		facultyId: string
		departmentId: string
	}
	description: string
	photo: Media | null
	coverPhoto: Media | null
	users: Record<ClassUsers, string[]>
	courses: string[]
	requests: string[]
	createdAt: number
	updatedAt: number
}
