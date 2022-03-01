import { IAnnouncementRepository } from '../../irepositories/announcements'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { AnnouncementEntity } from '../../entities/announcements'

export class GetAnnouncementsUseCase extends BaseUseCase<QueryParams, QueryResults<AnnouncementEntity>> {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
