import { IGroupRepository } from '../../irepositories/groups'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { GroupEntity } from '../../entities/groups'

export class GetGroupsUseCase extends BaseUseCase<QueryParams, QueryResults<GroupEntity>> {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
