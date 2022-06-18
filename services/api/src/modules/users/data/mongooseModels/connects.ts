import { generateChangeStreams, mongoose } from '@utils/commons'
import { ConnectFromModel } from '../models/connects'
import { ConnectEntity } from '../../domain/entities/connects'
import { ConnectMapper } from '../mappers/connects'
import { ConnectChangeStreamCallbacks } from '@utils/changeStreams/users/connects'

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

generateChangeStreams<ConnectFromModel, ConnectEntity>(Connect, ConnectChangeStreamCallbacks, new ConnectMapper().mapFrom).then()