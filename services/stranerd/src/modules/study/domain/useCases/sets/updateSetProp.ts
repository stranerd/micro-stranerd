import { SetFromModel } from '../../../data/models/sets'
import { ISetRepository } from '../../irepositories/sets'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, userId: string, prop: keyof SetFromModel['saved'], add: boolean, values: string[] }

export class UpdateSetPropUseCase extends BaseUseCase<Input, boolean> {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateSetProp(input.id, input.userId, input.prop, input.add, input.values)
	}
}
