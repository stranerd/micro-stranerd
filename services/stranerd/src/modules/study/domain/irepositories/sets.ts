import { SetEntity } from '../entities/sets'
import { SetToModel } from '../../data/models/sets'
import { MediaOutput, QueryParams, QueryResults } from '@utils/commons'
import { SetSaved, UserBio, UserRoles } from '../types'

export interface ISetRepository {
	add: (data: SetToModel) => Promise<SetEntity>
	get: (condition: QueryParams) => Promise<QueryResults<SetEntity>>
	find: (id: string) => Promise<SetEntity | null>
	update: (id: string, userId: string, data: Partial<SetToModel>) => Promise<SetEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateSetsUserBio: (userId: string, userBio: UserBio, userRoles: UserRoles) => Promise<boolean>
	updateSetsClassName: (classId: string, className: string, classAvatar: MediaOutput) => Promise<boolean>
	updateSetProp: (id: string, userId: string, prop: SetSaved, add: boolean, values: string[]) => Promise<boolean>
	removeSetProp: (prop: SetSaved, value: string) => Promise<boolean>
	deleteSetChildren: (id: string) => Promise<boolean>
	updateSetChildren: (id: string, add: boolean, values: string[]) => Promise<boolean>
}