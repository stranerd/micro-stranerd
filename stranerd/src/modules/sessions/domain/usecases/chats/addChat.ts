import { IChatRepository } from '../../irepositories/chat'
import { BaseUseCase } from '@utils/commons'
import { ChatToModel } from '../../../data/models/chat'
import { ChatEntity } from '../../entities/chat'

export class AddChatUseCase extends BaseUseCase<ChatToModel, ChatEntity> {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		super()
		this.repository = repository
	}

	async execute (data: ChatToModel) {
		return await this.repository.add(data)
	}
}