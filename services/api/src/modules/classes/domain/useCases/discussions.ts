import { DiscussionToModel } from '../../data/models/discussions'
import { IDiscussionRepository } from '../irepositories/discussions'
import { QueryParams } from '@utils/commons'
import { EmbeddedUser } from '../types'

export class DiscussionsUseCase {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		this.repository = repository
	}

	async add (data: DiscussionToModel) {
		return await this.repository.add(data)
	}

	async deleteGroupDiscussions (groupId: string) {
		return await this.repository.deleteGroupDiscussions(groupId)
	}

	async delete (data: { classId: string, id: string, userId: string }) {
		return await this.repository.delete(data.classId, data.id, data.userId)
	}

	async find (input: { classId: string, id: string }) {
		return await this.repository.find(input.classId, input.id)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async update (input: { classId: string, id: string, userId: string, data: Partial<DiscussionToModel> }) {
		return await this.repository.update(input.classId, input.id, input.userId, input.data)
	}

	async updateUserBio (user: EmbeddedUser) {
		return await this.repository.updateUserBio(user)
	}

	async markRead (input: { classId: string, groupId: string, userId: string }) {
		return await this.repository.markRead(input.classId, input.groupId, input.userId)
	}
}
