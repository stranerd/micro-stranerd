import { FlashCardToModel } from '../../../data/models/flashCards'
import { IFlashCardRepository } from '../../irepositories/flashCards'
import { BaseUseCase } from '@utils/commons'
import { FlashCardEntity } from '../../entities/flashCards'

export class AddFlashCardUseCase extends BaseUseCase<FlashCardToModel, FlashCardEntity> {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		super()
		this.repository = repository
	}

	async execute (data: FlashCardToModel) {
		return await this.repository.add(data)
	}
}
