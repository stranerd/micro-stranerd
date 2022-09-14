import { DepartmentToModel } from '../../data/models/departments'
import { IDepartmentRepository } from '../irepositories/departments'
import { QueryParams } from '@utils/app/package'

export class DepartmentsUseCase {
	private repository: IDepartmentRepository

	constructor (repository: IDepartmentRepository) {
		this.repository = repository
	}

	async add (data: DepartmentToModel) {
		return await this.repository.add(data)
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async update (input: { id: string, data: Partial<DepartmentToModel> }) {
		return await this.repository.update(input.id, input.data)
	}

	async deleteFacultyDepartments (facultyId: string) {
		return await this.repository.deleteFacultyDepartments(facultyId)
	}

	async deleteTagDepartments (tagId: string) {
		return await this.repository.deleteTagDepartments(tagId)
	}
}
