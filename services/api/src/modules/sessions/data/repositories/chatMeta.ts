import { parseQueryParams, QueryParams } from '@utils/commons'
import { IChatMetaRepository } from '../../domain/irepositories/chatMeta'
import { ChatMetaMapper } from '../mappers/chatMeta'
import { ChatMetaFromModel } from '../models/chatMeta'
import { ChatMeta } from '../mongooseModels/chatMeta'
import { EmbeddedUser } from '../../domain/types'

export class ChatMetaRepository implements IChatMetaRepository {
	private static instance: ChatMetaRepository
	private mapper = new ChatMetaMapper()

	private constructor () {
		this.mapper = new ChatMetaMapper()
	}

	static getInstance () {
		if (!ChatMetaRepository.instance) ChatMetaRepository.instance = new ChatMetaRepository()
		return ChatMetaRepository.instance
	}

	async find (id: string, userId: string) {
		const chat = await ChatMeta.findOne({ _id: id, ownerId: userId })
		return this.mapper.mapFrom(chat)
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<ChatMetaFromModel>(ChatMeta, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async updateBio (id: string, user: EmbeddedUser) {
		const chatMeta = await ChatMeta.findOneAndUpdate({ _id: id }, { $set: { user } })
		return !!chatMeta
	}

	async updateUserBio (user: EmbeddedUser) {
		const result = await ChatMeta.updateMany({ 'user.id': user.id }, { $set: { user } })
		return !!result.acknowledged
	}
}
