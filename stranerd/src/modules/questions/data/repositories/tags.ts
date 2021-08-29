import { ITagRepository } from '../../domain/irepositories/tags'
import { TagMapper } from '../mappers'
import { TagFromModel } from '../models/tags'
import { Tag } from '../mongooseModels'
import { parseQueryParams, QueryParams } from '@utils/commons'

export class TagRepository implements ITagRepository {
	private static instance: TagRepository
	private mapper: TagMapper

	private constructor () {
		this.mapper = new TagMapper()
	}

	static getInstance () {
		if (!TagRepository.instance) TagRepository.instance = new TagRepository()
		return TagRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<TagFromModel>(Tag, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async find (id: string) {
		const tag = await Tag.findById(id)
		return this.mapper.mapFrom(tag)
	}

	async incrementCount (id: string) {
		await Tag.findByIdAndUpdate(id, { $inc: { count: 1 } }, { upsert: true, new: true })
		return true
	}

	async decrementCount (id: string) {
		await Tag.findByIdAndUpdate(id, { $inc: { count: -1 } }, { upsert: true, new: true })
		return true
	}
}
