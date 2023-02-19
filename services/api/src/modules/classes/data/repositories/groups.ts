import { QueryParams } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { IGroupRepository } from '../../domain/irepositories/groups'
import { ClassUsers, EmbeddedUser } from '../../domain/types'
import { GroupMapper } from '../mappers/groups'
import { GroupFromModel, GroupToModel } from '../models/groups'
import { Group } from '../mongooseModels/groups'

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
		const data = await appInstance.db.parseQueryParams<GroupFromModel>(Group, query)

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
}
