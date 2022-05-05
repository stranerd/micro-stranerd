import { IVideoRepository } from '../../domain/irepositories/videos'
import { VideoMapper } from '../mappers/videos'
import { VideoFromModel, VideoToModel } from '../models/videos'
import { Video } from '../mongooseModels/videos'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { EmbeddedUser } from '../../domain/types'

export class VideoRepository implements IVideoRepository {
	private static instance: VideoRepository
	private mapper: VideoMapper

	private constructor () {
		this.mapper = new VideoMapper()
	}

	static getInstance () {
		if (!VideoRepository.instance) VideoRepository.instance = new VideoRepository()
		return VideoRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<VideoFromModel>(Video, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: VideoToModel) {
		const video = await new Video(data).save()
		return this.mapper.mapFrom(video)!
	}

	async find (id: string) {
		const video = await Video.findById(id)
		return this.mapper.mapFrom(video)
	}

	async update (id: string, userId: string, data: Partial<VideoToModel>) {
		const video = await Video.findOneAndUpdate({ _id: id, 'user.id': userId }, { $set: data }, { new: true })
		return this.mapper.mapFrom(video)
	}

	async updateUserBio (user: EmbeddedUser) {
		const videos = await Video.updateMany({ 'user.id': user.id }, { $set: { user } })
		return videos.acknowledged
	}

	async delete (id: string, userId: string) {
		const video = await Video.findOneAndDelete({ _id: id, 'user.id': userId })
		return !!video
	}
}
