import { IDepartmentRepository } from '../../irepositories/departments'
import { BaseUseCase } from '@utils/commons'
import { DepartmentEntity } from '../../entities/departments'

export class FindDepartmentUseCase extends BaseUseCase<string, DepartmentEntity | null> {
	private repository: IDepartmentRepository

	constructor (repository: IDepartmentRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
