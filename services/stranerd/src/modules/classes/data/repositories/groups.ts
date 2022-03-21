import { IGroupRepository } from '../../domain/irepositories/groups'
import { GroupMapper } from '../mappers/groups'
import { GroupFromModel, GroupToModel } from '../models/groups'
import { Group } from '../mongooseModels/groups'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { ClassUsers, UserBio, UserRoles } from '../../domain/types'

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

	async find (id: string) {
		const group = await Group.findById(id)
		return this.mapper.mapFrom(group)
	}

	async update (id: string, userId: string, data: Partial<GroupToModel>) {
		const group = await Group.findOneAndUpdate({ _id: id, 'users.admins': userId }, { $set: data }, { new: true })
		return this.mapper.mapFrom(group)
	}

	async delete (id: string, userId: string) {
		const group = await Group.findOneAndDelete({ _id: id, 'users.admins': userId })
		return !!group
	}

	async updateGroupsUserBio (userId: string, userBio: UserBio, userRoles: UserRoles) {
		const groups = await Group.updateMany({ userId }, { $set: { userBio, userRoles } })
		return groups.acknowledged
	}

	async updateGroupsUsers (classId: string, users: Record<ClassUsers, string[]>) {
		const groups = await Group.updateMany({ classId }, { $set: { users } })
		return groups.acknowledged
	}

	async deleteClassGroups (classId: string) {
		const groups = await Group.deleteMany({ classId })
		return groups.acknowledged
	}
}