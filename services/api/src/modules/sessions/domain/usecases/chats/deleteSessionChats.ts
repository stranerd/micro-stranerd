import { IChatRepository } from '../../irepositories/chat'
import { BaseUseCase } from '@utils/commons'

export class DeleteSessionChatsUseCase extends BaseUseCase<string, boolean> {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		super()
		this.repository = repository
	}

	async execute (sessionId: string) {
		return await this.repository.deleteSessionChats(sessionId)
	}
}