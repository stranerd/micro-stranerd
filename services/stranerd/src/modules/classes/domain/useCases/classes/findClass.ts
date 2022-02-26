import { IClassRepository } from '../../irepositories/classes'
import { BaseUseCase } from '@utils/commons'
import { ClassEntity } from '../../entities/classes'

export class FindClassUseCase extends BaseUseCase<string, ClassEntity | null> {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
