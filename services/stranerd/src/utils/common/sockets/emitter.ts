import io from 'socket.io'
import { match as Match } from 'path-to-regexp'
import { BaseEntity } from '../structure'
import { AuthApps, AuthUser } from '../utils/authUser'
import { verifyAccessToken } from '../utils/tokens'
import { StatusCodes } from '../express'

enum EmitTypes {
	created = 'created',
	updated = 'updated',
	deleted = 'deleted'
}

type LeaveRoomParams = { channel: string }
type JoinRoomParams = { channel: string, token?: string, app?: string }
type Callback = (params: { code: StatusCodes, message: string, channel: string }) => void
type OnJoinFn = (data: { channel: string, user: AuthUser | null, app: AuthApps }, params: Record<string, any>) => Promise<string | null>
export type SocketCallers = {
	onConnect: (userId: string, socketId: string) => Promise<void>
	onDisconnect: (userId: string, socketId: string) => Promise<void>
}

export class SocketEmitter {
	private readonly socket
	private readonly routes = {} as Record<string, OnJoinFn>

	constructor (socket: io.Server, callers: SocketCallers) {
		this.socket = socket
		this.setupSocketConnection(this.socket, callers)
	}

	get quickRegisters () {
		const isAdmin: OnJoinFn = async ({ user, app, channel }) => user?.roles[app]?.isAdmin ? channel : null
		const isMine: OnJoinFn = async ({ channel, user }) => user ? `${channel}/${user.id}` : null
		const isOpen: OnJoinFn = async ({ channel }) => channel
		return { isAdmin, isMine, isOpen }
	}

	async emitCreated (channel: string, data: BaseEntity) {
		await this.emit(channel, EmitTypes.created, data)
	}

	async emitPathCreated (channel: string, data: BaseEntity, path: string) {
		await this.emit(`${channel}/${path}`, EmitTypes.created, data)
	}

	async emitUpdated (channel: string, data: BaseEntity) {
		await this.emit(channel, EmitTypes.updated, data)
	}

	async emitPathUpdated (channel: string, data: BaseEntity, path: string) {
		await this.emit(`${channel}/${path}`, EmitTypes.updated, data)
	}

	async emitDeleted (channel: string, data: BaseEntity) {
		await this.emit(channel, EmitTypes.deleted, data)
	}

	async emitPathDeleted (channel: string, data: BaseEntity, path: string) {
		await this.emit(`${channel}/${path}`, EmitTypes.deleted, data)
	}

	register (channel: string, onJoin?: OnJoinFn) {
		if (!onJoin) onJoin = async ({ channel }) => channel
		this.routes[channel] = onJoin
	}

	private getJoinCb (channel: string) {
		const matcher = (key: string) => Match(key, { encode: encodeURI, decode: decodeURIComponent })(channel)
		const matchedChannel = Object.keys(this.routes).find(matcher) ?? null
		if (!matchedChannel) return null
		const match = matcher(matchedChannel)
		if (!match) return null
		return {
			onJoin: this.routes[matchedChannel],
			params: JSON.parse(JSON.stringify(match.params))
		}
	}

	private async emit (channel: string, type: EmitTypes, data: any) {
		this.socket.to(channel).emit(channel, {
			type, data, channel
		})
	}

	private setupSocketConnection = (socketInstance: io.Server, callers: SocketCallers) => {
		socketInstance.on('connection', async (socket) => {
			const socketId = socket.id
			const app = socket.handshake.auth.app ?? ''
			let user = null as AuthUser | null
			if (socket.handshake.auth.token) user = await verifyAccessToken(socket.handshake.auth.token ?? '').catch(() => null)
			socket.on('leave', async (data: LeaveRoomParams, callback: Callback) => {
				if (!data.channel) return typeof (callback) === 'function' && callback({
					code: StatusCodes.ValidationError,
					message: 'channel is required',
					channel: ''
				})
				socket.leave(data.channel)
				return typeof (callback) === 'function' && callback({
					code: StatusCodes.Ok,
					message: '',
					channel: data.channel
				})
			})
			socket.on('join', async (data: JoinRoomParams, callback: Callback) => {
				if (!data.channel) return typeof (callback) === 'function' && callback({
					code: StatusCodes.ValidationError,
					message: 'channel is required',
					channel: ''
				})
				if (!app) return typeof (callback) === 'function' && callback({
					code: StatusCodes.ValidationError,
					message: 'app is required',
					channel: data.channel
				})
				if (!Object.values<string>(AuthApps).includes(app)) return callback({
					code: StatusCodes.ValidationError,
					message: 'app is not a supported app',
					channel: data.channel
				})
				const channel = data.channel
				const route = this.getJoinCb(channel) ?? null
				if (!route) return typeof (callback) === 'function' && callback({
					code: StatusCodes.BadRequest,
					message: 'unknown channel',
					channel
				})
				const newChannel = await route.onJoin({ channel, user, app }, route.params)
				if (!newChannel) return typeof (callback) === 'function' && callback({
					code: StatusCodes.NotAuthorized,
					message: 'restricted access',
					channel
				})
				socket.join(newChannel)
				return typeof (callback) === 'function' && callback({
					code: StatusCodes.Ok,
					message: '',
					channel: newChannel
				})
			})
			if (user) await callers.onConnect(user.id, socketId)
			socket.on('disconnect', async () => {
				if (user) await callers.onDisconnect(user.id, socketId)
			})
		})
	}
}