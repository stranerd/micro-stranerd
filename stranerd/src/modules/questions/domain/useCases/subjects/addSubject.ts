import { SubjectToModel } from '../../../data/models/subjects'
import { ISubjectRepository } from '../../irepositories/subjects'
import { BaseUseCase } from '@utils/commons'
import { SubjectEntity } from '../../entities/subjects'

export class AddSubjectUseCase extends BaseUseCase<SubjectToModel, SubjectEntity> {
	private repository: ISubjectRepository

	constructor (repository: ISubjectRepository) {
		super()
		this.repository = repository
	}

	async execute (data: SubjectToModel) {
		return await this.repository.add(data)
	}
}
