import { INoteRepository } from '../../irepositories/notes'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { NoteEntity } from '../../entities/notes'

export class GetNotesUseCase extends BaseUseCase<QueryParams, QueryResults<NoteEntity>> {
	private repository: INoteRepository

	constructor (repository: INoteRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
