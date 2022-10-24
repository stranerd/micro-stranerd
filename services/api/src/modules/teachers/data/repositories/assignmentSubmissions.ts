import { IAssignmentSubmissionRepository } from '../../domain/irepositories/assignmentSubmissions'
import { AssignmentSubmissionMapper } from '../mappers/assignmentSubmissions'
import { AssignmentSubmissionFromModel, AssignmentSubmissionToModel } from '../models/assignmentSubmissions'
import { AssignmentSubmission } from '../mongooseModels/assignmentSubmissions'
import { BadRequestError, mongoose, NotAuthorizedError, parseQueryParams, QueryParams } from '@utils/app/package'
import { EmbeddedUser } from '../../domain/types'
import { Assignment } from '../mongooseModels/assignments'
import { AssignmentMapper } from '../mappers/assignments'

export class AssignmentSubmissionRepository implements IAssignmentSubmissionRepository {
	private static instance: AssignmentSubmissionRepository
	private mapper: AssignmentSubmissionMapper
	private assignmentMapper: AssignmentMapper

	private constructor () {
		this.mapper = new AssignmentSubmissionMapper()
		this.assignmentMapper = new AssignmentMapper()
	}

	static getInstance () {
		if (!AssignmentSubmissionRepository.instance) AssignmentSubmissionRepository.instance = new AssignmentSubmissionRepository()
		return AssignmentSubmissionRepository.instance
	}

	async submit (data: AssignmentSubmissionToModel) {
		let res = null as any
		const session = await mongoose.startSession()
		await session.withTransaction(async (session) => {
			const assignment = this.assignmentMapper.mapFrom(await Assignment.findById(data.assignmentId, {}, { session }))
			if (!assignment || !assignment.members.includes(data.user.id)) throw new NotAuthorizedError('can\'t submit to this assignment')
			if (assignment.deadline! > Date.now()) throw new BadRequestError('deadline is passed')
			const submission = await AssignmentSubmission.findOneAndUpdate({
				assignmentId: data.assignmentId, 'user.id': data.user.id, courseId: assignment.courseId
			}, {
				$setOnInsert: { ...data, members: assignment.members, courseId: assignment.courseId },
				$set: { attachments: data.attachments }
			}, {
				session, new: true, upsert: true
			})
			await Assignment.findByIdAndUpdate(assignment.id, {
				$addToSet: { submissions: { userId: data.user.id, id: submission._id } }
			}, { session })
			res = submission
			return res
		})
		await session.endSession()
		return this.mapper.mapFrom(res)!
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
