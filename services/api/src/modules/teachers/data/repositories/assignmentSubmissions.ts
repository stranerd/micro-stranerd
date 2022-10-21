import { IAssignmentSubmissionRepository } from '../../domain/irepositories/assignmentSubmissions'
import { AssignmentSubmissionMapper } from '../mappers/assignmentSubmissions'
import { AssignmentSubmissionFromModel } from '../models/assignmentSubmissions'
import { AssignmentSubmission } from '../mongooseModels/assignmentSubmissions'
import { parseQueryParams, QueryParams } from '@utils/app/package'
import { EmbeddedUser } from '../../domain/types'

export class AssignmentSubmissionRepository implements IAssignmentSubmissionRepository {
	private static instance: AssignmentSubmissionRepository
	private mapper: AssignmentSubmissionMapper

	private constructor () {
		this.mapper = new AssignmentSubmissionMapper()
	}

	static getInstance () {
		if (!AssignmentSubmissionRepository.instance) AssignmentSubmissionRepository.instance = new AssignmentSubmissionRepository()
		return AssignmentSubmissionRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<AssignmentSubmissionFromModel>(AssignmentSubmission, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async find (id: string) {
		const assignmentSubmission = await AssignmentSubmission.findById(id)
		return this.mapper.mapFrom(assignmentSubmission)
	}

	async updateUserBio (user: EmbeddedUser) {
		const assignmentSubmissions = await AssignmentSubmission.updateMany({ 'user.id': user.id }, { $set: { user } })
		return assignmentSubmissions.acknowledged
	}

	async delete (courseId: string, id: string, userId: string) {
		const assignmentSubmission = await AssignmentSubmission.findOneAndDelete({
			_id: id,
			courseId,
			'user.id': userId
		})
		return !!assignmentSubmission
	}

	async updateMembers (courseId: string, members: string[]) {
		const res = await AssignmentSubmission.updateMany({ courseId }, { $set: { members } }, { new: true })
		return res.acknowledged
	}

	async deleteAssignmentSubmissions (assignmentId: string) {
		const res = await AssignmentSubmission.deleteMany({ assignmentId })
		return res.acknowledged
	}
}
