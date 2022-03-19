import { IDepartmentRepository } from '../../irepositories/departments'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { DepartmentEntity } from '../../entities/departments'

export class GetDepartmentsUseCase extends BaseUseCase<QueryParams, QueryResults<DepartmentEntity>> {
	private repository: IDepartmentRepository

	constructor (repository: IDepartmentRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
