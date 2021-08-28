import { ITagRepository } from '../../domain/i-repositories/tag'
import { TagEntity } from '../../domain/entities/tag'
import { TagMapper } from '../mappers'
import { TagFromModel } from '../models/tag'
import { Tags } from '../mongooseModels'
import { PaginateResult } from 'mongoose'
import { GetClause } from '@utils/paginator'
import { generatePaginateResult } from '@utils/paginator'

export class TagRepository implements ITagRepository {
	private static instance: TagRepository
	private mapper: TagMapper

	private constructor () {
		this.mapper = new TagMapper()
	}

	static getInstance (): TagRepository {
		if (!TagRepository.instance) TagRepository.instance = new TagRepository()
		return TagRepository.instance
	}

	async get (condition: GetClause): Promise<PaginateResult<TagEntity> | null> {

		const tags: TagEntity[] = []
		const tagsRaw: PaginateResult<TagFromModel> = await Tags.paginate(condition.query,condition.options)

		if(tagsRaw) {

			 const returnData = tagsRaw.docs

			  returnData.forEach((data) => {
				const tag: TagEntity = this.mapper.mapFrom(data)
				tags.push(tag)
			  })  

			 const finalResult: PaginateResult<TagEntity> = generatePaginateResult(tags,tagsRaw)

			 return finalResult
			 }
		 return null
	}


}
