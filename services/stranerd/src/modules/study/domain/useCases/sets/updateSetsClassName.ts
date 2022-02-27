import { ISetRepository } from '../../irepositories/sets'
import { BaseUseCase } from '@utils/commons'
import { Media } from '../../types'

type Input = { classId: string, className: string, classAvatar: Media }

export class UpdateSetsClassNameUseCase extends BaseUseCase<Input, boolean> {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateSetsClassName(input.classId, input.className, input.classAvatar)
	}
}
