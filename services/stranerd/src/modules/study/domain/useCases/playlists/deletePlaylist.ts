import { IPlaylistRepository } from '../../irepositories/playlists'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, userId: string }

export class DeletePlaylistUseCase extends BaseUseCase<Input, boolean> {
	private repository: IPlaylistRepository

	constructor (repository: IPlaylistRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.delete(input.id, input.userId)
	}
}
