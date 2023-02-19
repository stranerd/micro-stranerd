import { QueryParams } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { IAssignmentRepository } from '../../domain/irepositories/assignments'
import { EmbeddedUser } from '../../domain/types'
import { AssignmentMapper } from '../mappers/assignments'
import { AssignmentFromModel, AssignmentToModel } from '../models/assignments'
import { Assignment } from '../mongooseModels/assignments'

export class AssignmentRepository implements IAssignmentRepository {
	private static instance: AssignmentRepository
	private mapper: AssignmentMapper

	private constructor () {
		this.mapper = new AssignmentMapper()
	}

	static getInstance () {
		if (!AssignmentRepository.instance) AssignmentRepository.instance = new AssignmentRepository()
		return AssignmentRepository.instance
	}

	async get (query: QueryParams) {
		const data = await appInstance.db.parseQueryParams<AssignmentFromModel>(Assignment, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: AssignmentToModel) {
		const assignment = await new Assignment(data).save()
		return this.mapper.mapFrom(assignment)!
	}

	async find (id: string) {
		const assignment = await Assignment.findById(id)
		return this.mapper.mapFrom(assignment)
	}

	async update (courseId: string, id: string, userId: string, data: Partial<AssignmentToModel>) {
		const assignment = await Assignment.findOneAndUpdate({
			_id: id, courseId,
			'user.id': userId
		}, { $set: data }, { new: true })
		return this.mapper.mapFrom(assignment)
	}

	async updateUserBio (user: EmbeddedUser) {
		const assignments = await Assignment.updateMany({ 'user.id': user.id }, { $set: { user } })
		return assignments.acknowledged
	}

	async delete (courseId: string, id: string, userId: string) {
		const assignment = await Assignment.findOneAndDelete({ _id: id, courseId, 'user.id': userId })
		return !!assignment
	}

	async updateMembers (courseId: string, members: string[]) {
		const res = await Assignment.updateMany({ courseId }, { $set: { members } }, { new: true })
		return res.acknowledged
	}

	async deleteCourseAssignments (courseId: string) {
		const res = await Assignment.deleteMany({ courseId })
		return res.acknowledged
	}
}
