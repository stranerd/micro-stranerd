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

	async emitCreated (channel: string, data: BaseEntity) {
		await this.emit(channel, EmitTypes.created, data)
	}

	async emitUpdated (channel: string, data: BaseEntity) {
		await this.emit(channel, EmitTypes.updated, data)
	}

	async emitDeleted (channel: string, data: { id: string }) {
		await this.emit(channel, EmitTypes.deleted, data)
	}

	private async emit (channel: string, type: EmitTypes, data: any) {
		this.socket.emit(channel, {
			type, data
		})
	}
}