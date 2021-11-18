import { SetFromModel } from '../../../data/models/sets'
import { ISetRepository } from '../../irepositories/sets'
import { BaseUseCase } from '@utils/commons'

type Input = { prop: keyof SetFromModel['saved'], value: string }

export class RemoveSetPropUseCase extends BaseUseCase<Input, boolean> {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.removeSetProp(input.prop, input.value)
	}
}
