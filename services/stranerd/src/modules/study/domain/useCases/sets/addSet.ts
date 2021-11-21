import { SetToModel } from '../../../data/models/sets'
import { ISetRepository } from '../../irepositories/sets'
import { BaseUseCase } from '@utils/commons'
import { SetEntity } from '../../entities/sets'

export class AddSetUseCase extends BaseUseCase<SetToModel, SetEntity> {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		super()
		this.repository = repository
	}

	async execute (data: SetToModel) {
		return await this.repository.add(data)
	}
}
