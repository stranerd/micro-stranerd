import { ConnectEntity } from '../entities/connects'
import { QueryParams, QueryResults } from '@utils/commons'
import { ConnectToModel } from '../../data/models/connects'
import { EmbeddedUser } from '@modules/users'

export interface IConnectRepository {
	find: (data: { userId: string, id: string }) => Promise<ConnectEntity | null>
	get: (query: QueryParams) => Promise<QueryResults<ConnectEntity>>
	create: (data: ConnectToModel) => Promise<ConnectEntity>
	accept: (data: { id: string, userId: string, accept: boolean }) => Promise<boolean>
	delete: (data: { id: string, userId: string }) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
}