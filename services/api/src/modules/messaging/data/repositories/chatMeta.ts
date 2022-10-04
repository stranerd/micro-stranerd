import { parseQueryParams, QueryParams } from '@utils/app/package'
import { IChatMetaRepository } from '../../domain/irepositories/chatMeta'
import { ChatMetaMapper } from '../mappers/chatMeta'
import { ChatMetaFromModel, ChatMetaToModel } from '../models/chatMeta'
import { ChatMeta } from '../mongooseModels/chatMeta'
import { ChatType, EmbeddedGroup, EmbeddedUser } from '../../domain/types'
import { ChatFromModel } from '../models/chat'

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

	async add (data: ChatMetaToModel) {
		const conditions = [] as any[]
		if (data.data.type === ChatType.personal) conditions.push({
			'data.type': ChatType.personal,
			[`data.users.${data.members[0]}`]: { $exists: true },
			[`data.users.${data.members[1]}`]: { $exists: true }
		})
		if (data.data.type === ChatType.classes) conditions.push({
			'data.type': ChatType.classes,
			'data.group.id': data.data.group.id
		})
		const chatMeta = await ChatMeta.findOneAndUpdate({
			$or: conditions
		}, {
			$setOnInsert: { ...data }
		}, { upsert: true, new: true })
		return this.mapper.mapFrom(chatMeta)!
	}

	async find (id: string) {
		const chat = await ChatMeta.findById(id)
		return this.mapper.mapFrom(chat)
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<ChatMetaFromModel>(ChatMeta, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async updateLastChat (chat: ChatFromModel) {
		await ChatMeta.updateMany({ 'last._id': chat._id }, { $set: { last: chat } })
	}

	async updateUserBio (user: EmbeddedUser) {
		const result = await ChatMeta.updateMany(
			{ [`data.users.${user.id}`]: { $exists: true } },
			{ $set: { [`data.users.${user.id}`]: user } })
		return !!result.acknowledged
	}

	async updateClassGroup (group: EmbeddedGroup, members: string[]) {
		const result = await ChatMeta.updateMany(
			{ 'data.group.id': group.id },
			{ $set: { 'data.group': group, members } })
		return !!result.acknowledged
	}

	async deleteGroupMeta (groupId: string) {
		const result = await ChatMeta.deleteMany({ 'data.group.id': groupId })
		return !!result.acknowledged
	}
}
