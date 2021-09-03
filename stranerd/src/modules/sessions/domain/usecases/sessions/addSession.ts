import { ISessionRepository } from '../../irepositories/session'
import { BaseUseCase } from '@utils/commons'
import { SessionEntity } from '@modules/sessions'
import { SessionToModel } from '@modules/sessions/data/models/session'

export class AddSessionUseCase extends BaseUseCase<SessionToModel, SessionEntity> {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		super()
		this.repository = repository
	}

	async execute (data: SessionToModel) {
		return await this.repository.add(data)
	}
}