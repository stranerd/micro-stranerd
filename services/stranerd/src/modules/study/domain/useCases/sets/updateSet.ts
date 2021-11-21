import { SetToModel } from '../../../data/models/sets'
import { ISetRepository } from '../../irepositories/sets'
import { BaseUseCase } from '@utils/commons'
import { SetEntity } from '../../entities/sets'

type Input = { id: string, userId: string, data: Partial<SetToModel> }

export class UpdateSetUseCase extends BaseUseCase<Input, SetEntity | null> {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.update(input.id, input.userId, input.data)
	}
}
