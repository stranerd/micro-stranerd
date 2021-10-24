import { NoteToModel } from '../../../data/models/notes'
import { INoteRepository } from '../../irepositories/notes'
import { BaseUseCase } from '@utils/commons'
import { NoteEntity } from '../../entities/notes'
import { OmitUser } from '../../types'

type Input = { id: string, userId: string, data: OmitUser<NoteToModel> }

export class UpdateNoteUseCase extends BaseUseCase<Input, NoteEntity | null> {
	private repository: INoteRepository

	constructor (repository: INoteRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.update(input.id, input.userId, input.data)
	}
}
