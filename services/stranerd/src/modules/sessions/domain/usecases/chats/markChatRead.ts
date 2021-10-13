import { IChatRepository } from '../../irepositories/chat'
import { BaseUseCase } from '@utils/commons'

type Input = { chatId: string, path: [string, string] }

export class MarkChatReadUseCase extends BaseUseCase<Input, boolean> {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.markRead(input.chatId, input.path)
	}
}
