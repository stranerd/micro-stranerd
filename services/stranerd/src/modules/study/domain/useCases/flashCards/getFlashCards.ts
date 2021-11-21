import { IFlashCardRepository } from '../../irepositories/flashCards'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { FlashCardEntity } from '../../entities/flashCards'

export class GetFlashCardsUseCase extends BaseUseCase<QueryParams, QueryResults<FlashCardEntity>> {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
