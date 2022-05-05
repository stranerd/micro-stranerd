import { SetEntity } from '../entities/sets'
import { SetToModel } from '../../data/models/sets'
import { QueryParams, QueryResults } from '@utils/commons'
import { EmbeddedUser, SetSaved } from '../types'

export interface ISetRepository {
	add: (data: SetToModel) => Promise<SetEntity>
	get: (condition: QueryParams) => Promise<QueryResults<SetEntity>>
	find: (id: string) => Promise<SetEntity | null>
	update: (id: string, userId: string, data: Partial<SetToModel>) => Promise<SetEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
	updateProp: (id: string, userId: string, prop: SetSaved, add: boolean, values: string[]) => Promise<boolean>
	removeProp: (prop: SetSaved, value: string) => Promise<boolean>
}