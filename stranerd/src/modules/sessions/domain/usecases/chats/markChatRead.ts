import { IChatRepository } from '../../irepositories/chat'
import { BaseUseCase } from '@utils/commons'

export class MarkChatReadUseCase extends BaseUseCase<string, boolean> {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.markRead(id)
	}
}
