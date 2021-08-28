import { ITagRepository } from '../../domain/i-repositories/tag'
import { TagEntity } from '../../domain/entities/tag'
import { TagMapper } from '../mappers'
import { TagFromModel } from '../models/tag'
import { Tags } from '../mongooseModels'

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

	async get (tagIds?: string[]):  Promise<TagEntity[]> {
		const tags: TagEntity[] = []

		if(tagIds == undefined) {

		 const tagsRaw: TagFromModel[] | null = await Tags.find({})
		 if(tagsRaw) {

			 for (let index = 0; index < tagsRaw.length; index++) {
				 const tagData = tagsRaw[index]
				 const tag: TagEntity = this.mapper.mapFrom(tagData)
				 tags.push(tag)
			 }

		   } 

		} else { 
		
		 for (let index = 0; index < tagIds.length; index++) {
			 const tagId = tagIds[index]
			 const tagRaw: TagFromModel | null = await Tags.findById(tagId)
			
			 if(tagRaw) {
				 const tag: TagEntity = this.mapper.mapFrom(tagRaw)
				 tags.push(tag)
			 }
		 }
	 }
         
		 return tags
	}

}
