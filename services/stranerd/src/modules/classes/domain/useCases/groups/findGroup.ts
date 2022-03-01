import { IGroupRepository } from '../../irepositories/groups'
import { BaseUseCase } from '@utils/commons'
import { GroupEntity } from '../../entities/groups'

export class FindGroupUseCase extends BaseUseCase<string, GroupEntity | null> {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
