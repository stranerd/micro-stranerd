import { DocumentToModel } from '../../data/models/documents'
import { IDocumentRepository } from '../irepositories/documents'
import { QueryParams } from '@utils/commons'
import { EmbeddedUser } from '../types'

export class DocumentsUseCase {
	private repository: IDocumentRepository

	constructor (repository: IDocumentRepository) {
		this.repository = repository
	}

	async add (data: DocumentToModel) {
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

	async update (input: { id: string, userId: string, data: Partial<DocumentToModel> }) {
		return await this.repository.update(input.id, input.userId, input.data)
	}

	async updateUserBio (user: EmbeddedUser) {
		return await this.repository.updateUserBio(user)
	}
}
