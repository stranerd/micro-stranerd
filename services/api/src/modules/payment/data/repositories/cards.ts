import { ICardRepository } from '../../domain/irepositories/cards'
import { CardMapper } from '../mappers/cards'
import { CardFromModel, CardToModel } from '../models/cards'
import { BadRequestError, mongoose, parseQueryParams, QueryParams } from '@utils/commons'
import { Card } from '../mongooseModels/cards'

export class CardRepository implements ICardRepository {
	private static instance: CardRepository
	private mapper: CardMapper

	private constructor () {
		this.mapper = new CardMapper()
	}

	static getInstance () {
		if (!CardRepository.instance) CardRepository.instance = new CardRepository()
		return CardRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<CardFromModel>(Card, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async create (data: CardToModel) {
		const firstCard = await Card.findOne({ userId: data.userId })
		const card = new Card(data)
		if (!firstCard) return (await this.makePrimary(card.id, data.userId))!
		return this.mapper.mapFrom(card)!
	}

	async find (id: string, userId: string) {
		const card = await Card.findOne({ _id: id, userId })
		return this.mapper.mapFrom(card)
	}

	async makePrimary (id: string, userId: string) {
		let res = null as any
		const session = await mongoose.startSession()
		await session.withTransaction(async (session) => {
			await Card.updateMany({ _id: { $ne: id }, userId }, { $set: { primary: false } }, { session })
			const card = Card.findOneAndUpdate({ _id: id, userId }, { $set: { primary: true } }, { session, new: true })
			res = card
			return card
		})
		await session.endSession()
		return this.mapper.mapFrom(res)
	}

	async delete (id: string, userId: string) {
		let card = await Card.findOne({ _id: id, userId, primary: true })
		if (card) throw new BadRequestError('You can\'t delete your primary card')
		card = await Card.findOneAndDelete({ _id: id, userId })
		return !!card
	}
}
