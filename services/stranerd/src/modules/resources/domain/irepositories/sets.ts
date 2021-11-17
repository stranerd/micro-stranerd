import { SetEntity } from '../entities/sets'
import { SetFromModel, SetToModel } from '../../data/models/sets'
import { QueryParams, QueryResults } from '@utils/commons'
import { UserBio } from '../types'

export interface ISetRepository {
	add: (data: SetToModel) => Promise<SetEntity>
	get: (condition: QueryParams) => Promise<QueryResults<SetEntity>>
	find: (id: string) => Promise<SetEntity | null>
	update: (id: string, userId: string, data: Partial<SetToModel>) => Promise<SetEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateSetsUserBio: (userId: string, userBio: UserBio) => Promise<boolean>
	updateSetProp: (id: string, userId: string, prop: keyof SetFromModel['saved'], add: boolean, values: string[]) => Promise<boolean>
}