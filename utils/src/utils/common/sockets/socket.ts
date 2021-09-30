import io from 'socket.io'
import { StatusCodes } from '../express'
import { verifyAccessToken } from '../utils/tokens'
import { AuthApps, AuthUser } from '../utils/authUser'

export type SocketParams = {
	open: string[]
	mine: string[]
	admin: string[]
}

type LeaveRoomParams = { channel: string }
type JoinRoomParams = { channel: string, token?: string, app?: string }
type Callback = (params: { code: StatusCodes, message: string, channel: string }) => void

const channelExists = (channels: string[], channel: string) => channels.some((c) => channel.startsWith(c))

export type SocketCallers = {
	onConnect: (userId: string, socketId: string) => Promise<void>
	onDisconnect: (userId: string, socketId: string) => Promise<void>
}

export const setupSocketConnection = (socketInstance: io.Server, params: SocketParams, callers: SocketCallers) => {
	socketInstance.on('connection', async (socket) => {
		const socketId = socket.id
		const app = socket.handshake.auth.app ?? ''
		let user = null as AuthUser | null
		if (socket.handshake.auth.token) user = await verifyAccessToken(socket.handshake.auth.token ?? '').catch(() => null)
		const allChannels = [...params.open, ...params.mine, ...params.admin]
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
			let channel = data.channel
			if (!channelExists(allChannels, data.channel)) return typeof (callback) === 'function' && callback({
				code: StatusCodes.BadRequest,
				message: 'unknown channel',
				channel: data.channel
			})
			if (channelExists(params.admin, data.channel)) {
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
				if (!user) return typeof (callback) === 'function' && callback({
					code: StatusCodes.NotAuthorized,
					message: 'invalid or expired token',
					channel: data.channel
				})
				if (!user.roles[app]?.isAdmin) return typeof (callback) === 'function' && callback({
					code: StatusCodes.NotAuthorized,
					message: 'restricted privileges',
					channel: data.channel
				})
				channel = data.channel
			} else if (channelExists(params.mine, data.channel)) {
				if (!user) return typeof (callback) === 'function' && callback({
					code: StatusCodes.NotAuthorized,
					message: 'invalid or expired token',
					channel: data.channel
				})
				channel = `${data.channel}/${user.id}`
			}
			socket.join(channel)
			return typeof (callback) === 'function' && callback({
				code: StatusCodes.Ok,
				message: '',
				channel
			})
		})
		if (user) await callers.onConnect(user.id, socketId)
		socket.on('disconnect', async () => {
			if (user) await callers.onDisconnect(user.id, socketId)
		})
	})

	return socketInstance
}