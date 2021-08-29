import io from 'socket.io'
import { StatusCodes } from './statusCodes'
import { verifyAccessToken } from '../utils/tokens'

type Params = {
	open: string[]
	mine: string[]
	admin: string[]
}

type LeaveRoomParams = { channel: string }
type JoinRoomParams = { channel: string, token?: string, app?: string }
type Callback = (params: { code: StatusCodes, message: string, channel: string }) => void

const channelExists = (channels: string[], channel: string) => channels.some((c) => channel.startsWith(c))

export const setupSocketConnection = (socketInstance: io.Server, params: Params) => {
	socketInstance.on('connection', (socket) => {
		const allChannels = [...params.open, ...params.mine, ...params.admin]
		socket.on('leave', async (data: LeaveRoomParams, _, callback: Callback) => {
			if (!data.channel) return callback({
				code: StatusCodes.ValidationError,
				message: 'channel is required',
				channel: ''
			})
			socket.leave(data.channel)
			return callback({
				code: StatusCodes.Ok,
				message: '',
				channel: data.channel
			})
		})
		socket.on('join', async (data: JoinRoomParams, _, callback: Callback) => {
			if (!data.channel) return callback({
				code: StatusCodes.ValidationError,
				message: 'channel is required',
				channel: ''
			})
			if (channelExists(allChannels, data.channel)) return callback({
				code: StatusCodes.BadRequest,
				message: 'unknown channel',
				channel: data.channel
			})
			if (channelExists(params.admin, data.channel)) {
				if (!data.app) return callback({
					code: StatusCodes.ValidationError,
					message: 'app is required',
					channel: data.channel
				})
				if (!data.token) return callback({
					code: StatusCodes.ValidationError,
					message: 'token is required',
					channel: data.channel
				})
				const user = await verifyAccessToken(data.token).catch(() => null)
				if (!user) return callback({
					code: StatusCodes.NotAuthenticated,
					message: 'invalid or expired token',
					channel: data.channel
				})
				if (!user.roles[data.app].isAdmin) return callback({
					code: StatusCodes.NotAuthorized,
					message: 'restricted privileges',
					channel: data.channel
				})
				const channel = data.channel
				socket.join(channel)
				return callback({
					code: StatusCodes.Ok,
					message: '',
					channel
				})
			} else if (channelExists(params.mine, data.channel)) {
				if (!data.token) return callback({
					code: StatusCodes.ValidationError,
					message: 'token is required',
					channel: data.channel
				})
				const user = await verifyAccessToken(data.token).catch(() => null)
				if (!user) return callback({
					code: StatusCodes.NotAuthenticated,
					message: 'invalid or expired token',
					channel: data.channel
				})
				const channel = `${ data.channel }/${ user.id }`
				socket.join(channel)
				return callback({
					code: StatusCodes.Ok,
					message: '',
					channel
				})
			}
			socket.join(data.channel)
			return callback({
				code: StatusCodes.Ok,
				message: '',
				channel: data.channel
			})
		})
	})

	return socketInstance
}