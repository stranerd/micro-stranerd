import { ChatMapper } from '../mappers/chat'
import { IChatRepository } from '../../domain/irepositories/chat'
import { ChatFromModel, ChatToModel } from '../models/chat'
import { Chat } from '../mongooseModels/chat'
import { parseQueryParams, QueryParams } from '@utils/commons'

export class ChatRepository implements IChatRepository {

	private static instance: ChatRepository
	private mapper: ChatMapper

	private constructor () {
		this.mapper = new ChatMapper()
	}

	static getInstance () {
		if (!ChatRepository.instance) ChatRepository.instance = new ChatRepository()
		return ChatRepository.instance
	}

	async add (data: ChatToModel) {
		const chat = await new Chat(data).save()
		return this.mapper.mapFrom(chat)!
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<ChatFromModel>(Chat, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async find (id: string) {
		const chat = await Chat.findById(id)
		return this.mapper.mapFrom(chat)
	}

	async markRead (id: string,data: Partial<ChatToModel>) {
		const chat = await Chat.findOneAndUpdate({ _id: id }, data, { new: true })
		return !!chat
	}

	async delete (id: string) {
		const chat = await Chat.findOneAndDelete({ _id: id })
		return !!chat
	}
}
