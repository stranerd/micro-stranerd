import { generateChangeStreams, mongoose } from '@utils/commons'
import { SubjectFromModel } from '../models/subjects'
import { SubjectChangeStreamCallbacks } from '@utils/changeStreams/questions/subjects'
import { SubjectEntity } from '../../domain/entities/subjects'
import { SubjectMapper } from '../mappers/subjects'

const Schema = new mongoose.Schema<SubjectFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	name: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
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

export const Subject = mongoose.model<SubjectFromModel>('StranerdQuestionsSubject', Schema)

generateChangeStreams<SubjectFromModel, SubjectEntity>(Subject, SubjectChangeStreamCallbacks, new SubjectMapper().mapFrom).then()