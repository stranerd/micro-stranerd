import { DepartmentToModel } from '../../../data/models/departments'
import { IDepartmentRepository } from '../../irepositories/departments'
import { BaseUseCase } from '@utils/commons'
import { DepartmentEntity } from '../../entities/departments'

type Input = { id: string, data: Partial<DepartmentToModel> }

export class UpdateDepartmentUseCase extends BaseUseCase<Input, DepartmentEntity | null> {
	private repository: IDepartmentRepository

	constructor (repository: IDepartmentRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.update(input.id, input.data)
	}
}
