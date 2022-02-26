import { IGroupRepository } from '../../domain/irepositories/groups'
import { GroupMapper } from '../mappers/groups'
import { GroupFromModel, GroupToModel } from '../models/groups'
import { Group } from '../mongooseModels/groups'
import { parseQueryParams, QueryParams } from '@utils/commons'

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
		const group = await Group.findOneAndUpdate({ _id: id, admins: userId }, { $set: data }, { new: true })
		return this.mapper.mapFrom(group)
	}

	async delete (id: string, userId: string) {
		const group = await Group.findOneAndDelete({ _id: id, admins: userId })
		return !!group
	}

	async updateGroupsAdmins (classId: string, admins: string[]) {
		const groups = await Group.updateMany({ classId }, { $set: { admins } })
		return groups.acknowledged
	}
}
