import { INoteRepository } from '../../irepositories/notes'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, userId: string }

export class DeleteNoteUseCase extends BaseUseCase<Input, boolean> {
	private repository: INoteRepository

	constructor (repository: INoteRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.delete(input.id, input.userId)
	}
}
