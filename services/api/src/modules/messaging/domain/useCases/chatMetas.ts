import { IChatMetaRepository } from '../irepositories/chatMeta'
import { QueryParams } from '@utils/app/package'
import { EmbeddedGroup, EmbeddedUser } from '../types'
import { ChatFromModel } from '../../data/models/chat'
import { ChatMetaToModel } from '../../data/models/chatMeta'

export class ChatMetasUseCase {
	private repository: IChatMetaRepository

	constructor (repository: IChatMetaRepository) {
		this.repository = repository
	}

	async add (data: ChatMetaToModel) {
		return await this.repository.add(data)
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

	async updateClassGroup (group: EmbeddedGroup, members: string[]) {
		return await this.repository.updateClassGroup(group, members)
	}

	async deleteGroupMeta (groupId: string) {
		return await this.repository.deleteGroupMeta(groupId)
	}

	async updateLastChat (chat: ChatFromModel) {
		return await this.repository.updateLastChat(chat)
	}
}