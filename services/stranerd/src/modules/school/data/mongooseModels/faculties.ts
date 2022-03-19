import { generateChangeStreams, mongoose } from '@utils/commons'
import { FacultyFromModel } from '../models/faculties'
import { FacultyChangeStreamCallbacks } from '@utils/changeStreams/school/faculties'
import { FacultyEntity } from '../../domain/entities/faculties'
import { FacultyMapper } from '../mappers/faculties'

const Schema = new mongoose.Schema<FacultyFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	name: {
		type: String,
		required: true
	},
	institutionId: {
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

export const Faculty = mongoose.model<FacultyFromModel>('StranerdStudyFaculty', Schema)

generateChangeStreams<FacultyFromModel, FacultyEntity>(Faculty, FacultyChangeStreamCallbacks, new FacultyMapper().mapFrom).then()