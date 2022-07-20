import { generateChangeStreams, mongoose } from '@utils/commons'
import { PlanFromModel } from '../models/plans'
import { PlanChangeStreamCallbacks } from '@utils/changeStreams/payment/plans'
import { PlanEntity } from '../../domain/entities/plans'
import { PlanMapper } from '../mappers/plans'

const PlanSchema = new mongoose.Schema<PlanFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	name: {
		type: String,
		required: true
	},
	active: {
		type: Boolean,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	currency: {
		type: mongoose.Schema.Types.Mixed,
		required: true
	},
	interval: {
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

export const Plan = mongoose.model<PlanFromModel>('StranerdPaymentPlan', PlanSchema)

generateChangeStreams<PlanFromModel, PlanEntity>(Plan, PlanChangeStreamCallbacks, new PlanMapper().mapFrom).then()