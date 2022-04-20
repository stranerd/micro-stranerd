import { ISessionRepository } from '../../irepositories/session'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { SessionEntity } from '../../entities/session'

export class GetSessionsUseCase extends BaseUseCase<QueryParams, QueryResults<SessionEntity>> {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}