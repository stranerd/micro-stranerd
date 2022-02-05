import { ISetRepository } from '../../irepositories/sets'
import { BaseUseCase } from '@utils/commons'
import { SetSaved } from '../../types'

type Input = { prop: SetSaved, value: string }

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
