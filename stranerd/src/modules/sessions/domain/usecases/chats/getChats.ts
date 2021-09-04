import { IChatRepository } from '../../irepositories/chat'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { ChatEntity } from '../../entities/chat'

export class GetChatsUseCase extends BaseUseCase<QueryParams, QueryResults<ChatEntity>> {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
