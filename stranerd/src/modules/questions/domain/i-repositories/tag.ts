import { GetClause } from '@utils/paginator'
import { TagEntity } from '../entities/tag'
import { PaginateResult } from 'mongoose'

export interface ITagRepository {
	get: (condition: GetClause) => Promise<PaginateResult<TagEntity> | null>
}
