import { ClassToModel } from '../../../data/models/classes'
import { IClassRepository } from '../../irepositories/classes'
import { BaseUseCase } from '@utils/commons'
import { ClassEntity } from '../../entities/classes'

type Input = { id: string, userId: string, data: Partial<ClassToModel> }

export class UpdateClassUseCase extends BaseUseCase<Input, ClassEntity | null> {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.update(input.id, input.userId, input.data)
	}
}
