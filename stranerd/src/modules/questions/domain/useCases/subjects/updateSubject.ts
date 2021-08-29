import { SubjectToModel } from '../../../data/models'
import { ISubjectRepository } from '../../irepositories/subjects'
import { BaseUseCase } from '@utils/commons'
import { SubjectEntity } from '../../entities'

type Input = { id: string, data: SubjectToModel }

export class UpdateSubjectUseCase extends BaseUseCase<Input, SubjectEntity> {
	private repository: ISubjectRepository

	constructor (repository: ISubjectRepository) {
		super()
		this.repository = repository
	}

	async execute (input) {
		return await this.repository.update(input.id, input.data)
	}
}
