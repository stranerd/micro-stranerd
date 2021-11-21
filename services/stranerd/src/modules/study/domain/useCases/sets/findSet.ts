import { ISetRepository } from '../../irepositories/sets'
import { BaseUseCase } from '@utils/commons'
import { SetEntity } from '../../../domain/entities/sets'

export class FindSetUseCase extends BaseUseCase<string, SetEntity | null> {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
