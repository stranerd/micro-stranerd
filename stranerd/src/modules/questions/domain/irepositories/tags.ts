import { QueryParams, QueryResults } from '@utils/commons'
import { TagEntity } from '../entities/tags'

export interface ITagRepository {
	get: (query: QueryParams) => Promise<QueryResults<TagEntity>>
	find: (id: string) => Promise<TagEntity | null>
	updateTagsCount: (tagNames: string[], increment: boolean) => Promise<boolean>
}
