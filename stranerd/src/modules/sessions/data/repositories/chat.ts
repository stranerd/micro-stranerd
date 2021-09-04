import { ChatMapper } from '../mappers/chat'
import { IChatRepository } from '../../domain/irepositories/chat'
import { ChatFromModel, ChatToModel } from '../models/chat'
import { Chat } from '../mongooseModels/chat'
import { mongoose, parseQueryParams, QueryParams } from '@utils/commons'
import { ChatMeta } from '../mongooseModels/chatMeta'

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

	async add (data: ChatToModel, path: [string, string]) {
		const session = await mongoose.startSession()
		try {
			const chat = await new Chat({ ...data, path: this.formPath(path) }).save({ session })
			await ChatMeta.findOneAndUpdate(
				{ ownerId: path[0], userId: path[1] },
				{ $set: { last: chat, ownerId: path[0], userId: path[1] } },
				{ upsert: true, session })
			await ChatMeta.findOneAndUpdate(
				{ ownerId: path[1], userId: path[0] },
				{
					$set: { last: chat, ownerId: path[1], userId: path[0] },
					$push: { unRead: chat.id }
				},
				{ upsert: true, session }
			)

			await session.commitTransaction()
			session.endSession()
			return this.mapper.mapFrom(chat)!
		} catch (e) {
			await session.abortTransaction()
			session.endSession()
			throw e
		}
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

	async markRead (id: string, path: [string, string]) {
		const session = await mongoose.startSession()
		const readAt = Date.now()
		try {
			const chat = await Chat.findOneAndUpdate(
				{ _id: id, path: this.formPath(path), readAt: null },
				{ readAt },
				{ new: true, session }
			)
			await ChatMeta.findOneAndUpdate({
				ownerId: path[0], userId: path[1]
			}, { $pull: { unRead: id } }, { session })
			await ChatMeta.findOneAndUpdate({
				ownerId: path[0], userId: path[1], 'last.id': id
			}, { $set: { 'last.readAt': readAt } }, { session })

			await session.commitTransaction()
			session.endSession()
			return !!chat
		} catch (e) {
			await session.abortTransaction()
			session.endSession()
			throw e
		}
	}

	async delete (id: string, userId: string) {
		const chat = await Chat.findOneAndDelete({ _id: id, from: userId })
		return !!chat
	}

	private formPath = (path: [string, string]) => [...path].sort().join('---')
}
