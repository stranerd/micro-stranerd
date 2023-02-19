import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { ViewDbChangeCallbacks } from '@utils/changeStreams/interactions/views'
import { ViewEntity } from '../../domain/entities/views'
import { ViewFromModel } from '../models/views'
import { ViewMapper } from './../mappers/views'

const ViewSchema = new mongoose.Schema<ViewFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	entity: {
		type: mongoose.Schema.Types.Mixed as unknown as ViewFromModel['entity'],
		required: true
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as ViewFromModel['user'],
		required: true
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

export const View = mongoose.model<ViewFromModel>('StranerdInteractionsView', ViewSchema)

export const ViewChange = appInstance.db
	.generateDbChange<ViewFromModel, ViewEntity>(View, ViewDbChangeCallbacks, new ViewMapper().mapFrom)
