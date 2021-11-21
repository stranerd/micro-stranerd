import { NoteToModel } from '../../../data/models/notes'
import { INoteRepository } from '../../irepositories/notes'
import { BaseUseCase } from '@utils/commons'
import { NoteEntity } from '../../entities/notes'

export class AddNoteUseCase extends BaseUseCase<NoteToModel, NoteEntity> {
	private repository: INoteRepository

	constructor (repository: INoteRepository) {
		super()
		this.repository = repository
	}

	async execute (data: NoteToModel) {
		return await this.repository.add(data)
	}
}
