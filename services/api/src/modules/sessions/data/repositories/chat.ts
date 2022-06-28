import { ChatMapper } from '../mappers/chat'
import { IChatRepository } from '../../domain/irepositories/chat'
import { ChatFromModel, ChatToModel } from '../models/chat'
import { Chat } from '../mongooseModels/chat'
import { mongoose, parseQueryParams, QueryParams } from '@utils/commons'
import { ChatMeta } from '../mongooseModels/chatMeta'
import { ChatType, EmbeddedUser } from '../../domain/types'

const getChatMetaCondition = (from: string, to: string) => ({
	members: from,
	$or: [
		{
			'data.type': ChatType.personal,
			[`data.users.${from}`]: { $exists: true },
			[`data.users.${to}`]: { $exists: true }
		},
		{ 'data.type': ChatType.discussions, 'group.id': to }
	]
})

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
			const createdAt = Date.now()
			const chat = await new Chat({
				...data, createdAt, updatedAt: createdAt,
				readAt: { [data.from.id]: createdAt }
			}).save({ session })
			await ChatMeta.findOneAndUpdate(
				getChatMetaCondition(data.from.id, data.to),
				{ $set: { last: chat }, $max: { [`readAt.${data.from.id}`]: createdAt } },
				{ session })
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
		const chat = await Chat.findOne({ _id: id, $or: [{ 'from.id': userId }, { to: userId }] })
		return this.mapper.mapFrom(chat)
	}

	async update (id: string, userId: string, data: Partial<ChatToModel>) {
		const chat = await Chat.findOneAndUpdate({
			_id: id, 'from.id': userId
		}, { $set: data }, { new: true })
		return this.mapper.mapFrom(chat)
	}

	async markRead (from: string, to: string) {
		const readAt = Date.now()
		const session = await mongoose.startSession()
		let res = false
		await session.withTransaction(async (session) => {
			const chatMeta = await ChatMeta.findOneAndUpdate(
				getChatMetaCondition(from, to),
				{ $max: { [`readAt.${from}`]: readAt } },
				{ session }
			)
			if (!chatMeta) return false
			await Chat.updateMany(
				{ to, [`readAt.${from}`]: null },
				{ $set: { [`readAt.${from}`]: readAt } },
				{ session }
			)
			res = true
			return true
		})
		await session.endSession()
		return res
	}

	async delete (id: string, userId: string) {
		const chat = await Chat.findOneAndDelete({ _id: id, 'from.id': userId })
		return !!chat
	}

	async updateUserBio (user: EmbeddedUser) {
		const chats = await Chat.updateMany({ 'from.id': user.id }, { $set: { from: user } })
		return chats.acknowledged
	}

	async deleteClassGroupDiscussions (groupId: string) {
		const chats = await Chat.deleteMany({ 'data.type': ChatType.discussions, 'data.group.id': groupId })
		return chats.acknowledged
	}
}
