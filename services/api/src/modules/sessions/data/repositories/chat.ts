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

	async add (data: ChatToModel) {
		const session = await mongoose.startSession()
		let res = null as any
		await session.withTransaction(async (session) => {
			const chat = await new Chat(data).save({ session })
			await ChatMeta.findOneAndUpdate(
				{ ownerId: data.from, 'user.id': data.to },
				{
					$set: { last: chat },
					$setOnInsert: { ownerId: data.from, 'user.id': data.to }
				},
				{ upsert: true, session })
			await ChatMeta.findOneAndUpdate(
				{ ownerId: data.to, 'user.id': data.from },
				{
					$set: { last: chat },
					$setOnInsert: { ownerId: data.to, 'user.id': data.from },
					$addToSet: { unRead: chat._id }
				},
				{ upsert: true, session })
			res = chat
			return chat
		})
		await session.endSession()
		return this.mapper.mapFrom(res)!
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<ChatFromModel>(Chat, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async find (id: string, userId: string) {
		const chat = await Chat.findOne({ _id: id, $or: [{ from: userId }, { to: userId }] })
		return this.mapper.mapFrom(chat)
	}

	async markRead (id: string, from: string, to: string) {
		const session = await mongoose.startSession()
		let res = null as any
		await session.withTransaction(async (session) => {
			const readAt = Date.now()
			const chat = await Chat.findOneAndUpdate(
				{ _id: id, from, to, readAt: null },
				{ $set: { readAt } },
				{ new: true, session }
			)
			await ChatMeta.findOneAndUpdate({
				ownerId: from, 'user.id': to
			}, { $pull: { unRead: id } }, { session })
			await ChatMeta.findOneAndUpdate({
				ownerId: from, 'user.id': to, 'last._id': id
			}, { $set: { 'last.readAt': readAt } }, { session })

			res = !!chat
			return res
		})
		await session.endSession()
		return res
	}

	async delete (id: string, userId: string) {
		const chat = await Chat.findOneAndDelete({ _id: id, from: userId })
		return !!chat
	}

	async deleteSessionChats (sessionId: string) {
		const chats = await Chat.deleteMany({ sessionId })
		return chats.acknowledged
	}
}
