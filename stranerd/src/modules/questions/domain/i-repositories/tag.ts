import { TagEntity } from '../entities/tag'

export interface ITagRepository {
	get: (tagIds?: string[]) => Promise<TagEntity[]>
}
