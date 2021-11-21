import { FlashCardToModel } from '../../../data/models/flashCards'
import { IFlashCardRepository } from '../../irepositories/flashCards'
import { BaseUseCase } from '@utils/commons'
import { FlashCardEntity } from '../../entities/flashCards'

type Input = { id: string, userId: string, data: Partial<FlashCardToModel> }

export class UpdateFlashCardUseCase extends BaseUseCase<Input, FlashCardEntity | null> {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.update(input.id, input.userId, input.data)
	}
}
