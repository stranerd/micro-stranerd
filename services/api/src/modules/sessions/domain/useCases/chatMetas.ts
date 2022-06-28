import { IChatMetaRepository } from '../irepositories/chatMeta'
import { QueryParams } from '@utils/commons'
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

	async find (data: { id: string, userId: string }) {
		return await this.repository.find(data.id, data.userId)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async updateUserBio (user: EmbeddedUser) {
		return await this.repository.updateUserBio(user)
	}

	async updateClassGroup (group: EmbeddedGroup) {
		return await this.repository.updateClassGroup(group)
	}

	async updateClassGroupMembers (groupId: string, members: string[]) {
		return await this.repository.updateClassGroupMembers(groupId, members)
	}

	async updateLastChat (chat: ChatFromModel) {
		return await this.repository.updateLastChat(chat)
	}
}