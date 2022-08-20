import { IConnectRepository } from '../../domain/irepositories/connects'
import { ConnectMapper } from '../mappers/connects'
import { Connect } from '../mongooseModels/connects'
import { parseQueryParams } from '@utils/commons'
import { ConnectFromModel, ConnectToModel } from '../models/connects'
import { EmbeddedUser } from '../../domain/types'

export class ConnectRepository implements IConnectRepository {
	private static instance: ConnectRepository
	private mapper = new ConnectMapper()

	static getInstance (): ConnectRepository {
		if (!ConnectRepository.instance) ConnectRepository.instance = new ConnectRepository()
		return ConnectRepository.instance
	}

	async find ({ userId, id }: { userId: string, id: string }) {
		const connect = await Connect.findOne({ _id: id, $or: [{ 'from.id': userId }, { 'to.id': userId }] })
		return this.mapper.mapFrom(connect)
	}

	async get (query) {
		const data = await parseQueryParams<ConnectFromModel>(Connect, query)
		return {
			...data,
			results: data.results.map((u) => this.mapper.mapFrom(u)!)
		}
	}

	async create (data: ConnectToModel) {
		const id = [data.from.id, data.to.id].sort().join('---')
		const connect = await Connect.findOneAndUpdate({
			$or: [
				{ 'from.id': data.from.id, 'to.id': data.to.id },
				{ 'from.id': data.to.id, 'to.id': data.from.id }
			]
		}, {
			$setOnInsert: { ...data, _id: id }
		}, { upsert: true, new: true })
		return this.mapper.mapFrom(connect)!
	}

	async accept ({ id, userId, accept }: { id: string, userId: string, accept: boolean }) {
		const filter = { _id: id, 'to.id': userId, pending: true, accepted: false }
		const connect = await Connect.findOneAndUpdate(filter, { $set: { accepted: accept, pending: false } })
		return !!connect
	}

	async delete ({ id, userId }: { id: string, userId: string }) {
		const connect = await Connect.findOneAndDelete({
			_id: id,
			$or: [{ 'from.id': userId }, { 'to.id': userId, accepted: true }]
		})
		return !!connect
	}

	async updateUserBio (user: EmbeddedUser) {
		const connects = await Promise.all([
			Connect.updateMany({ 'from.id': user.id }, { $set: { from: user } }),
			Connect.updateMany({ 'to.id': user.id }, { $set: { to: user } })
		])
		return connects.every((c) => c.acknowledged)
	}
}