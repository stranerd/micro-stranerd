import { IChatRepository } from '../../irepositories/chat'
import { BaseUseCase } from '@utils/commons'
import { ChatEntity } from '../../entities/chat'

type Input = { userId: string, id: string }

export class FindChatUseCase extends BaseUseCase<Input, ChatEntity | null> {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.find(input.id, input.userId)
	}
}
