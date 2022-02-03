import { ISetRepository } from '../../irepositories/sets'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, add: boolean, values: string[] }

export class UpdateSetChildrenUseCase extends BaseUseCase<Input, boolean> {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateSetChildren(input.id, input.add, input.values)
	}
}
