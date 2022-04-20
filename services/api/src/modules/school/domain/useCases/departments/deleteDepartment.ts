import { IDepartmentRepository } from '../../irepositories/departments'
import { BaseUseCase } from '@utils/commons'

export class DeleteDepartmentUseCase extends BaseUseCase<string, boolean> {
	private repository: IDepartmentRepository

	constructor (repository: IDepartmentRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.delete(id)
	}
}
