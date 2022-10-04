import { GroupToModel } from '../../data/models/groups'
import { IGroupRepository } from '../irepositories/groups'
import { QueryParams } from '@utils/app/package'
import { ClassUsers, EmbeddedUser } from '../types'

export class GroupsUseCase {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		this.repository = repository
	}

	async add (data: GroupToModel) {
		return await this.repository.add(data)
	}

	async deleteClassGroups (classId: string) {
		return await this.repository.deleteClassGroups(classId)
	}

	async delete (data: { classId: string, id: string, userId: string }) {
		return await this.repository.delete(data.classId, data.id, data.userId)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async update (input: { classId: string, id: string, userId: string, data: Partial<GroupToModel> }) {
		return await this.repository.update(input.classId, input.id, input.userId, input.data)
	}

	async updateUserBio (user: EmbeddedUser) {
		return await this.repository.updateUserBio(user)
	}

	async updateUsers (input: { classId: string, users: Record<ClassUsers, string[]> }) {
		return await this.repository.updateUsers(input.classId, input.users)
	}
}
