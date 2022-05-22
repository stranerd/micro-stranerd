import { IGroupRepository } from '../../domain/irepositories/groups'
import { GroupMapper } from '../mappers/groups'
import { GroupFromModel, GroupToModel } from '../models/groups'
import { DiscussionFromModel } from '../models/discussions'
import { Group } from '../mongooseModels/groups'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { ClassUsers, EmbeddedUser } from '../../domain/types'

export class GroupRepository implements IGroupRepository {
	private static instance: GroupRepository
	private mapper: GroupMapper

	private constructor () {
		this.mapper = new GroupMapper()
	}

	static getInstance () {
		if (!GroupRepository.instance) GroupRepository.instance = new GroupRepository()
		return GroupRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<GroupFromModel>(Group, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: GroupToModel) {
		const group = await new Group(data).save()
		return this.mapper.mapFrom(group)!
	}

	async find (classId: string, id: string, userId: string) {
		const group = await Group.findOne({ _id: id, classId, 'users.members': userId })
		return this.mapper.mapFrom(group)
	}

	async update (classId: string, id: string, userId: string, data: Partial<GroupToModel>) {
		const group = await Group.findOneAndUpdate({
			_id: id,
			'users.admins': userId,
			classId
		}, { $set: data }, { new: true })
		return this.mapper.mapFrom(group)
	}

	async delete (classId: string, id: string, userId: string) {
		const group = await Group.findOneAndDelete({ _id: id, 'users.admins': userId, classId })
		return !!group
	}

	async updateUserBio (user: EmbeddedUser) {
		const groups = await Group.updateMany({ 'user.id': user.id }, { $set: { user } })
		return groups.acknowledged
	}

	async updateUsers (classId: string, users: Record<ClassUsers, string[]>) {
		const groups = await Group.updateMany({ classId }, { $set: { users } })
		return groups.acknowledged
	}

	async deleteClassGroups (classId: string) {
		const groups = await Group.deleteMany({ classId })
		return groups.acknowledged
	}

	async updateLastDiscussion (discussion: DiscussionFromModel) {
		await Group.updateMany({ 'last._id': discussion._id }, { $set: { last: discussion } })
	}
}
