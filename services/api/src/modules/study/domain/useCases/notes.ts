import { NoteToModel } from '../../data/models/notes'
import { INoteRepository } from '../irepositories/notes'
import { QueryParams } from '@utils/app/package'
import { EmbeddedUser } from '../types'

export class NotesUseCase {
	private repository: INoteRepository

	constructor (repository: INoteRepository) {
		this.repository = repository
	}

	async add (data: NoteToModel) {
		return await this.repository.add(data)
	}

	async delete (input: { id: string, userId: string }) {
		return await this.repository.delete(input.id, input.userId)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async update (input: { id: string, userId: string, data: Partial<NoteToModel> }) {
		return await this.repository.update(input.id, input.userId, input.data)
	}

	async updateUserBio (user: EmbeddedUser) {
		return await this.repository.updateUserBio(user)
	}
}
