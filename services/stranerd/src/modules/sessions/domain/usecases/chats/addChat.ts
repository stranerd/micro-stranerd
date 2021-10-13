import { IChatRepository } from '../../irepositories/chat'
import { BaseUseCase } from '@utils/commons'
import { ChatToModel } from '../../../data/models/chat'
import { ChatEntity } from '../../entities/chat'

type Input = { path: [string, string], data: ChatToModel }

export class AddChatUseCase extends BaseUseCase<Input, ChatEntity> {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.add(input.data, input.path)
	}
}