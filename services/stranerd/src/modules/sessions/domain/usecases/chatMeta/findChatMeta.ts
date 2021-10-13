import { BaseUseCase } from '@utils/commons'
import { ChatMetaEntity } from '../../entities/chatMeta'
import { IChatMetaRepository } from '../../irepositories/chatMeta'

type Input = { id: string, userId: string }

export class FindChatMetaUseCase extends BaseUseCase<Input, ChatMetaEntity | null> {
	private repository: IChatMetaRepository

	constructor (repository: IChatMetaRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.find(input.id, input.userId)
	}
}