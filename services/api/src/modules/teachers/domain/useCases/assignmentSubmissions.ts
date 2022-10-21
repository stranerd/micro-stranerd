import { IAssignmentSubmissionRepository } from '../irepositories/assignmentSubmissions'
import { QueryParams } from '@utils/app/package'
import { EmbeddedUser } from '../types'

export class AssignmentSubmissionsUseCase {
	private repository: IAssignmentSubmissionRepository

	constructor (repository: IAssignmentSubmissionRepository) {
		this.repository = repository
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

	async updateUserBio (user: EmbeddedUser) {
		return await this.repository.updateUserBio(user)
	}

	async updateMembers (data: { courseId: string, members: string[] }) {
		return this.repository.updateMembers(data.courseId, data.members)
	}

	async deleteAssignmentSubmissions (assignmentId: string) {
		return this.repository.deleteAssignmentSubmissions(assignmentId)
	}
}
