import { IDiscussionRepository } from '../../domain/irepositories/discussions'
import { DiscussionMapper } from '../mappers/discussions'
import { DiscussionFromModel, DiscussionToModel } from '../models/discussions'
import { Discussion } from '../mongooseModels/discussions'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { UserBio, UserRoles } from '../../domain/types'

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
		const discussion = await new Discussion(data).save()
		return this.mapper.mapFrom(discussion)!
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
		const discussion = await Discussion.findOneAndDelete({ _id: id, userId })
		return !!discussion
	}
}
