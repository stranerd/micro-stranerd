import { parseQueryParams, QueryParams } from '@utils/commons'
import { IChatMetaRepository } from '@modules/sessions/domain/irepositories/chatMeta'
import { ChatMetaMapper } from '../mappers/chatMeta'
import { ChatMetaFromModel } from '../models/chatMeta'
import { ChatMeta } from '../mongooseModels/chatMeta'

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
	async delete (id: string) {
		const chatMeta = await ChatMeta.findOneAndDelete({ _id: id })
		return !!chatMeta
	}
}
