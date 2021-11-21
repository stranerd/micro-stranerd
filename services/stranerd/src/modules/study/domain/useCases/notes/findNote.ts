import { INoteRepository } from '../../irepositories/notes'
import { BaseUseCase } from '@utils/commons'
import { NoteEntity } from '../../../domain/entities/notes'

export class FindNoteUseCase extends BaseUseCase<string, NoteEntity | null> {
	private repository: INoteRepository

	constructor (repository: INoteRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
