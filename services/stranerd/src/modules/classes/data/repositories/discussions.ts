import { IDiscussionRepository } from '../../domain/irepositories/discussions'
import { DiscussionMapper } from '../mappers/discussions'
import { DiscussionFromModel, DiscussionToModel } from '../models/discussions'
import { Discussion } from '../mongooseModels/discussions'
import { mongoose, parseQueryParams, QueryParams } from '@utils/commons'
import { UserBio, UserRoles } from '../../domain/types'
import { Group } from '@modules/classes/data/mongooseModels/groups'

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
			const discussionData = this.mapper.mapForMeta(discussion)
			await Group.findOneAndUpdate({ _id: data.groupId }, { $set: { last: discussionData } }, { session })
			res = discussion
			return discussion
		})
		await session.endSession()
		return this.mapper.mapFrom(res)!
	}

	async find (id: string) {
		const discussion = await Discussion.findById(id)
		return this.mapper.mapFrom(discussion)
	}

	async update (id: string, userId: string, data: Partial<DiscussionToModel>) {
		const discussion = await Discussion.findOneAndUpdate({ _id: id, userId }, { $set: data }, { new: true })
		return this.mapper.mapFrom(discussion)
	}

	async updateDiscussionsUserBio (userId: string, userBio: UserBio, userRoles: UserRoles) {
		const discussions = await Discussion.updateMany({ userId }, { $set: { userBio, userRoles } })
		return discussions.acknowledged
	}

	async delete (id: string, userId: string) {
		const session = await mongoose.startSession()
		let res = false
		await session.withTransaction(async (session) => {
			const discussion = await Discussion.findOneAndDelete({ _id: id, userId }, { session })
			if (discussion) await Group.findOneAndUpdate({ 'last._id': discussion.id }, { $set: { last: null } }, { session })
			res = !!discussion
			return discussion
		})
		await session.endSession()
		return res
	}
}
