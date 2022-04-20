import { ClassToModel } from '../../../data/models/classes'
import { IClassRepository } from '../../irepositories/classes'
import { BaseUseCase } from '@utils/commons'
import { ClassEntity } from '../../entities/classes'

export class AddClassUseCase extends BaseUseCase<ClassToModel, ClassEntity> {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		super()
		this.repository = repository
	}

	async execute (data: ClassToModel) {
		return await this.repository.add(data)
	}
}
