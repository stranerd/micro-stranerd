import { generateChangeStreams, mongoose } from '@utils/app/package'
import { ReportFromModel, ReportToModel } from '../models/reports'
import { ReportMapper } from '../mappers/reports'
import { ReportEntity } from '../../domain/entities/reports'
import { ReportChangeStreamCallbacks } from '@utils/changeStreams/moderation/reports'

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

generateChangeStreams<ReportFromModel, ReportEntity>(Report, ReportChangeStreamCallbacks, new ReportMapper().mapFrom).then()
