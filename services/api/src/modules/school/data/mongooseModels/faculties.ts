import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { FacultyDbChangeCallbacks } from '@utils/changeStreams/school/faculties'
import { FacultyEntity } from '../../domain/entities/faculties'
import { FacultyMapper } from '../mappers/faculties'
import { FacultyFromModel } from '../models/faculties'

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

export const Faculty = mongoose.model<FacultyFromModel>('StranerdSchoolFaculty', Schema)

export const FacultyChange = appInstance.db
	.generateDbChange<FacultyFromModel, FacultyEntity>(Faculty, FacultyDbChangeCallbacks, new FacultyMapper().mapFrom)