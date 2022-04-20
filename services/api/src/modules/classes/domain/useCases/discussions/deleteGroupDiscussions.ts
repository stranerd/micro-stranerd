import { BaseUseCase } from '@utils/commons'
import { IDiscussionRepository } from '../../irepositories/discussions'

export class DeleteGroupDiscussionsUseCase extends BaseUseCase<string, boolean> {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		super()
		this.repository = repository
	}

	async execute (groupId: string) {
		return await this.repository.deleteGroupDiscussions(groupId)
	}
}
