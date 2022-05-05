import { IChatRepository } from '../irepositories/chat'
import { ChatToModel } from '../../data/models/chat'
import { QueryParams } from '@utils/commons'

export class ChatsUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async add (data: ChatToModel) {
		return await this.repository.add(data)
	}

	async deleteSessionChats (sessionId: string) {
		return await this.repository.deleteSessionChats(sessionId)
	}

	async find (input: { userId: string, id: string }) {
		return await this.repository.find(input.id, input.userId)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async markRead (input: { chatId: string, from: string, to: string }) {
		return await this.repository.markRead(input.chatId, input.from, input.to)
	}
}