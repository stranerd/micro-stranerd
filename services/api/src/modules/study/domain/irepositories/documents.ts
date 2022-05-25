import { DocumentEntity } from '../entities/documents'
import { DocumentToModel } from '../../data/models/documents'
import { QueryParams, QueryResults } from '@utils/commons'
import { EmbeddedUser } from '../types'

export interface IDocumentRepository {
	add: (data: DocumentToModel) => Promise<DocumentEntity>
	get: (condition: QueryParams) => Promise<QueryResults<DocumentEntity>>
	find: (id: string) => Promise<DocumentEntity | null>
	update: (id: string, userId: string, data: Partial<DocumentToModel>) => Promise<DocumentEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
}