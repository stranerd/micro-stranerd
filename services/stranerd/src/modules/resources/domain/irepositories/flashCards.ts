import { FlashCardEntity } from '../entities/flashCards'
import { FlashCardToModel } from '../../data/models/flashCards'
import { QueryParams, QueryResults } from '@utils/commons'
import { UserBio } from '../types'

export interface IFlashCardRepository {
	add: (data: FlashCardToModel) => Promise<FlashCardEntity>
	get: (condition: QueryParams) => Promise<QueryResults<FlashCardEntity>>
	find: (id: string) => Promise<FlashCardEntity | null>
	update: (id: string, userId: string, data: Partial<FlashCardToModel>) => Promise<FlashCardEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateFlashCardsUserBio: (userId: string, userBio: UserBio) => Promise<boolean>
}