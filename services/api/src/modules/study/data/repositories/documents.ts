import { IDocumentRepository } from '../../domain/irepositories/documents'
import { DocumentMapper } from '../mappers/documents'
import { DocumentFromModel, DocumentToModel } from '../models/documents'
import { Document } from '../mongooseModels/documents'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { EmbeddedUser } from '../../domain/types'

export class DocumentRepository implements IDocumentRepository {
	private static instance: DocumentRepository
	private mapper: DocumentMapper

	private constructor () {
		this.mapper = new DocumentMapper()
	}

	static getInstance () {
		if (!DocumentRepository.instance) DocumentRepository.instance = new DocumentRepository()
		return DocumentRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<DocumentFromModel>(Document, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: DocumentToModel) {
		const document = await new Document(data).save()
		return this.mapper.mapFrom(document)!
	}

	async find (id: string) {
		const document = await Document.findById(id)
		return this.mapper.mapFrom(document)
	}

	async update (id: string, userId: string, data: Partial<DocumentToModel>) {
		const document = await Document.findOneAndUpdate({ _id: id, 'user.id': userId }, { $set: data }, { new: true })
		return this.mapper.mapFrom(document)
	}

	async updateUserBio (user: EmbeddedUser) {
		const documents = await Document.updateMany({ 'user.id': user.id }, { $set: { user } })
		return documents.acknowledged
	}

	async delete (id: string, userId: string) {
		const document = await Document.findOneAndDelete({ _id: id, 'user.id': userId })
		return !!document
	}
}
