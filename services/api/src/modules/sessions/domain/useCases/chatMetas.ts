import { IChatMetaRepository } from '../irepositories/chatMeta'
import { QueryParams } from '@utils/commons'
import { EmbeddedUser } from '../types'

export class ChatMetasUseCase {
	private repository: IChatMetaRepository

	constructor (repository: IChatMetaRepository) {
		this.repository = repository
	}

	async find (data: { id: string, userId: string }) {
		return await this.repository.find(data.id, data.userId)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async updateMetaUser (input: { id: string, user: EmbeddedUser }) {
		return await this.repository.updateBio(input.id, input.user)
	}

	async updateUserBio (user: EmbeddedUser) {
		return await this.repository.updateUserBio(user)
	}
}