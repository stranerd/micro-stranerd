import { IChatRepository } from '../../irepositories/chat'
import { BaseUseCase } from '@utils/commons'
import { ChatToModel } from '@modules/sessions/data/models/chat'

type Input = { id: string, data: Partial<ChatToModel> }

export class MarkChatReadUseCase extends BaseUseCase<Input, boolean> {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.markRead(input.id,input.data)
	}
}
