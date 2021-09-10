import { generateChangeStreams, mongoose } from '@utils/commons'
import { ReportFromModel, ReportToModel } from '../models/reports'
import { ReportMapper } from '../mappers/report'
import { ReportEntity } from '@modules/reports/domain/entities/report'
import { ReportChangeStreamCallbacks } from '@utils/changeStreams/report/report'

const ReportSchema = new mongoose.Schema<ReportFromModel>({
	_id: {
		type: String,
		default: new mongoose.Types.ObjectId() as unknown as string
	},
	type: {
		type: String,
		required: true
	},
	reporterId: {
		type: String,
		required: true
	},
	reporterBio: {
		type: Object as unknown as ReportToModel['reporterBio'],
		required: true
	},
	reportedId: {
		type: String,
		required: true
	},
	reported: {
		type: Object,
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
}, { timestamps: { currentTime: Date.now } })

export const Report = mongoose.model<ReportFromModel>('StranerdReport', ReportSchema)

generateChangeStreams<ReportFromModel, ReportEntity>(Report, ReportChangeStreamCallbacks, new ReportMapper().mapFrom).then()
