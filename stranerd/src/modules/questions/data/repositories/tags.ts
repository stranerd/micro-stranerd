import { ITagRepository } from '../../domain/irepositories/tags'
import { TagMapper } from '../mappers/tags'
import { TagFromModel } from '../models/tags'
import { Tag } from '../mongooseModels/tags'
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

	async updateTagsCount (tagNames: string[], increment: boolean) {
		const res = await Tag.bulkWrite(
			tagNames.filter((tag, index) => tagNames.indexOf(tag) === index).map((name) => ({
				updateOne: {
					filter: { name },
					update: {
						$set: { name },
						$inc: { count: increment ? 1 : -1 }
					},
					upsert: true
				}
			}))
		)
		return res.isOk()
	}
}
