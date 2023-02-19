import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { ReportDbChangeCallbacks } from '@utils/changeStreams/moderation/reports'
import { ReportEntity } from '../../domain/entities/reports'
import { ReportMapper } from '../mappers/reports'
import { ReportFromModel, ReportToModel } from '../models/reports'

const ReportSchema = new mongoose.Schema<ReportFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as ReportToModel['user'],
		required: true
	},
	entity: {
		type: mongoose.Schema.Types.Mixed,
		required: true
	},
	message: {
		type: String,
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

export const Report = mongoose.model<ReportFromModel>('StranerdModerationReport', ReportSchema)

export const ReportChange = appInstance.db
	.generateDbChange<ReportFromModel, ReportEntity>(Report, ReportDbChangeCallbacks, new ReportMapper().mapFrom)
