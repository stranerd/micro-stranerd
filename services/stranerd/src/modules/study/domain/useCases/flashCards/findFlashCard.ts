import { IFlashCardRepository } from '../../irepositories/flashCards'
import { BaseUseCase } from '@utils/commons'
import { FlashCardEntity } from '../../../domain/entities/flashCards'

export class FindFlashCardUseCase extends BaseUseCase<string, FlashCardEntity | null> {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
