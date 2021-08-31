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

	async updateTagCount (tagIds: string[],increment: boolean) {

		tagIds.forEach(async (tagId) => {
			if(increment) await Tag.findByIdAndUpdate(tagId, { $inc: { count: 1 } }, { upsert: true, new: true })
			else await Tag.findByIdAndUpdate(tagId, { $inc: { count: -1 } }, { upsert: true, new: true })
		 })
		
		return true
	}

}
