import { IDiscussionRepository } from '../../domain/irepositories/discussions'
import { DiscussionMapper } from '../mappers/discussions'
import { DiscussionFromModel, DiscussionToModel } from '../models/discussions'
import { Discussion } from '../mongooseModels/discussions'
import { mongoose, parseQueryParams, QueryParams } from '@utils/commons'
import { EmbeddedUser } from '../../domain/types'
import { Group } from '../mongooseModels/groups'

export class DiscussionRepository implements IDiscussionRepository {
	private static instance: DiscussionRepository
	private mapper: DiscussionMapper

	private constructor () {
		this.mapper = new DiscussionMapper()
	}

	static getInstance () {
		if (!DiscussionRepository.instance) DiscussionRepository.instance = new DiscussionRepository()
		return DiscussionRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<DiscussionFromModel>(Discussion, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: DiscussionToModel) {
		const session = await mongoose.startSession()
		let res = null as any
		await session.withTransaction(async (session) => {
			const discussion = await new Discussion(data).save({ session })
			await Group.findOneAndUpdate({ _id: data.groupId }, { $set: { last: discussion } }, { session })
			res = discussion
			return discussion
		})
		await session.endSession()
		return this.mapper.mapFrom(res)!
	}

	async find (classId: string, id: string) {
		const discussion = await Discussion.findOne({ _id: id, classId })
		return this.mapper.mapFrom(discussion)
	}

	async update (classId: string, id: string, userId: string, data: Partial<DiscussionToModel>) {
		const discussion = await Discussion.findOneAndUpdate({
			_id: id,
			'user.id': userId,
			classId
		}, { $set: data }, { new: true })
		return this.mapper.mapFrom(discussion)
	}

	async updateUserBio (user: EmbeddedUser) {
		const discussions = await Discussion.updateMany({ 'user.id': user.id }, { $set: { user } })
		return discussions.acknowledged
	}

	async delete (classId: string, id: string, userId: string) {
		const session = await mongoose.startSession()
		let res = false
		await session.withTransaction(async (session) => {
			const discussion = await Discussion.findOneAndDelete({ _id: id, 'user.id': userId, classId }, { session })
			if (discussion) await Group.findOneAndUpdate({ 'last._id': discussion.id }, { $set: { last: null } }, { session })
			res = !!discussion
			return discussion
		})
		await session.endSession()
		return res
	}

	async deleteGroupDiscussions (groupId: string) {
		const discussions = await Discussion.deleteMany({ groupId })
		return discussions.acknowledged
	}
}
