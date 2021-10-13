import { ISchoolRepository } from '../../irepositories/schools'
import { BaseUseCase } from '@utils/commons'
import { SchoolEntity } from '../../entities/schools'

export class FindSchoolUseCase extends BaseUseCase<string, SchoolEntity | null> {
	private repository: ISchoolRepository

	constructor (repository: ISchoolRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
