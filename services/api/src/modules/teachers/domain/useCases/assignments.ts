import { IAssignmentRepository } from '../irepositories/assignments'
import { AssignmentToModel } from '../../data/models/assignments'
import { QueryParams } from '@utils/app/package'
import { EmbeddedUser } from '../types'

export class AssignmentsUseCase {
	private repository: IAssignmentRepository

	constructor (repository: IAssignmentRepository) {
		this.repository = repository
	}

	async add (data: AssignmentToModel) {
		return await this.repository.add(data)
	}

	async delete (input: { courseId: string, id: string, userId: string }) {
		return await this.repository.delete(input.courseId, input.id, input.userId)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async update (input: { courseId: string, id: string, userId: string, data: Partial<AssignmentToModel> }) {
		return await this.repository.update(input.courseId, input.id, input.userId, input.data)
	}

	async updateUserBio (user: EmbeddedUser) {
		return await this.repository.updateUserBio(user)
	}

	async updateMembers (data: { courseId: string, members: string[] }) {
		return this.repository.updateMembers(data.courseId, data.members)
	}

	async deleteCourseAssignments (courseId: string) {
		return this.repository.deleteCourseAssignments(courseId)
	}
}
