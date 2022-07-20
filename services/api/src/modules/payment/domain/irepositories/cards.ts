import { CardToModel } from '../../data/models/cards'
import { CardEntity } from '../entities/cards'
import { QueryParams, QueryResults } from '@utils/commons'

export interface ICardRepository {
	create: (data: CardToModel) => Promise<CardEntity>
	get: (query: QueryParams) => Promise<QueryResults<CardEntity>>
	find: (id: string, userId: string) => Promise<CardEntity | null>
	makePrimary: (id: string, userId: string) => Promise<CardEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
}
