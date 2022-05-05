import { IFlashCardRepository } from '../../domain/irepositories/flashCards'
import { FlashCardMapper } from '../mappers/flashCards'
import { FlashCardFromModel, FlashCardToModel } from '../models/flashCards'
import { FlashCard } from '../mongooseModels/flashCards'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { EmbeddedUser } from '../../domain/types'

export class FlashCardRepository implements IFlashCardRepository {
	private static instance: FlashCardRepository
	private mapper: FlashCardMapper

	private constructor () {
		this.mapper = new FlashCardMapper()
	}

	static getInstance () {
		if (!FlashCardRepository.instance) FlashCardRepository.instance = new FlashCardRepository()
		return FlashCardRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<FlashCardFromModel>(FlashCard, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: FlashCardToModel) {
		const flashCard = await new FlashCard(data).save()
		return this.mapper.mapFrom(flashCard)!
	}

	async find (id: string) {
		const flashCard = await FlashCard.findById(id)
		return this.mapper.mapFrom(flashCard)
	}

	async update (id: string, userId: string, data: Partial<FlashCardToModel>) {
		const flashCard = await FlashCard.findOneAndUpdate({
			_id: id,
			'user.id': userId
		}, { $set: data }, { new: true })
		return this.mapper.mapFrom(flashCard)
	}

	async updateUserBio (user: EmbeddedUser) {
		const flashCards = await FlashCard.updateMany({ 'user.id': user.id }, { $set: { user } })
		return flashCards.acknowledged
	}

	async delete (id: string, userId: string) {
		const flashCard = await FlashCard.findOneAndDelete({ _id: id, 'user.id': userId })
		return !!flashCard
	}
}
