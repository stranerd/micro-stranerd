import { DepartmentToModel } from '../../../data/models/departments'
import { IDepartmentRepository } from '../../irepositories/departments'
import { BaseUseCase } from '@utils/commons'
import { DepartmentEntity } from '../../entities/departments'

export class AddDepartmentUseCase extends BaseUseCase<DepartmentToModel, DepartmentEntity> {
	private repository: IDepartmentRepository

	constructor (repository: IDepartmentRepository) {
		super()
		this.repository = repository
	}

	async execute (data: DepartmentToModel) {
		return await this.repository.add(data)
	}
}
