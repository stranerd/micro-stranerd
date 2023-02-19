import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { ConnectDbChangeCallbacks } from '@utils/changeStreams/users/connects'
import { ConnectEntity } from '../../domain/entities/connects'
import { ConnectMapper } from '../mappers/connects'
import { ConnectFromModel } from '../models/connects'

const ConnectSchema = new mongoose.Schema<ConnectFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	from: {
		type: mongoose.Schema.Types.Mixed as unknown as ConnectFromModel['from'],
		required: true
	},
	to: {
		type: mongoose.Schema.Types.Mixed as unknown as ConnectFromModel['to'],
		required: true
	},
	pending: {
		type: Boolean,
		required: false,
		default: true
	},
	accepted: {
		type: Boolean,
		required: false,
		default: false
	},
	createdAt: {
		type: Number,
		required: false,
		default: Date.now
	},
	updatedAt: {
		type: Number,
		required: false,
		default: Date.now
	}
}, { timestamps: { currentTime: Date.now }, minimize: false })

export const Connect = mongoose.model<ConnectFromModel>('StranerdUsersConnect', ConnectSchema)

export const ConnectChange = appInstance.db
	.generateDbChange<ConnectFromModel, ConnectEntity>(Connect, ConnectDbChangeCallbacks, new ConnectMapper().mapFrom)