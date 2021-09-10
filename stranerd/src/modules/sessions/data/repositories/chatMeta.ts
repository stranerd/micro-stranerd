import { parseQueryParams, QueryParams } from '@utils/commons'
import { IChatMetaRepository } from '../../domain/irepositories/chatMeta'
import { ChatMetaMapper } from '../mappers/chatMeta'
import { ChatMetaFromModel } from '../models/chatMeta'
import { ChatMeta } from '../mongooseModels/chatMeta'
import { UserBio } from '../../domain/types'

export class ChatMetaRepository implements IChatMetaRepository {
	private static instance: ChatMetaRepository
	private mapper: ChatMetaMapper

	private constructor () {
		this.mapper = new ChatMetaMapper()
	}

	static getInstance () {
		if (!ChatMetaRepository.instance) ChatMetaRepository.instance = new ChatMetaRepository()
		return ChatMetaRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<ChatMetaFromModel>(ChatMeta, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async updateBio (id: string, userBio: UserBio) {
		const chatMeta = await ChatMeta.findOneAndUpdate({ _id: id }, { $set: { userBio } })
		return !!chatMeta
	}

	async updateUserBios (userId: string, userBio: UserBio) {
		const result = await ChatMeta.updateMany({ userId }, { $set: { userBio } })
		return !!result.acknowledged
	}
}
