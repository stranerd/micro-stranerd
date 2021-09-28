import io from 'socket.io'
import { BaseEntity } from '../structure'

enum EmitTypes {
	created = 'created',
	updated = 'updated',
	deleted = 'deleted'
}

export class SocketEmitter {
	private readonly socket

	constructor (socket: io.Server) {
		this.socket = socket
	}

	async emitOpenCreated (channel: string, data: BaseEntity) {
		await this.emit(channel, EmitTypes.created, data)
	}

	async emitAdminCreated (channel: string, data: BaseEntity) {
		await this.emit(channel, EmitTypes.created, data)
	}

	async emitMineCreated (channel: string, data: BaseEntity, id: string) {
		await this.emit(`${channel}/${id}`, EmitTypes.created, data)
	}

	async emitOpenUpdated (channel: string, data: BaseEntity) {
		await this.emit(channel, EmitTypes.updated, data)
	}

	async emitAdminUpdated (channel: string, data: BaseEntity) {
		await this.emit(channel, EmitTypes.updated, data)
	}

	async emitMineUpdated (channel: string, data: BaseEntity, id: string) {
		await this.emit(`${channel}/${id}`, EmitTypes.updated, data)
	}

	async emitOpenDeleted (channel: string, data: BaseEntity) {
		await this.emit(channel, EmitTypes.deleted, data)
	}

	async emitAdminDeleted (channel: string, data: BaseEntity) {
		await this.emit(channel, EmitTypes.deleted, data)
	}

	async emitMineDeleted (channel: string, data: BaseEntity, id: string) {
		await this.emit(`${channel}/${id}`, EmitTypes.deleted, data)
	}

	private async emit (channel: string, type: EmitTypes, data: any) {
		this.socket.to(channel).emit(channel, {
			type, data, channel
		})
	}
}