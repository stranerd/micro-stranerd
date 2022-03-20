import { IDepartmentRepository } from '../../irepositories/departments'
import { BaseUseCase } from '@utils/commons'

export class DeleteFacultyDepartmentsUseCase extends BaseUseCase<string, boolean> {
	private repository: IDepartmentRepository

	constructor (repository: IDepartmentRepository) {
		super()
		this.repository = repository
	}

	async execute (facultyId: string) {
		return await this.repository.deleteFacultyDepartments(facultyId)
	}
}
