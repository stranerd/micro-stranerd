import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { ChatMetaEntity } from '../../entities/chatMeta'
import { IChatMetaRepository } from '../../irepositories/chatMeta'

export class GetChatsMetaUseCase extends BaseUseCase<QueryParams, QueryResults<ChatMetaEntity>> {
	private repository: IChatMetaRepository

	constructor (repository: IChatMetaRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}