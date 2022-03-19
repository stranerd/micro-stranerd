import { generateChangeStreams, mongoose } from '@utils/commons'
import { DepartmentFromModel } from '../models/departments'
import { DepartmentChangeStreamCallbacks } from '@utils/changeStreams/school/departments'
import { DepartmentEntity } from '../../domain/entities/departments'
import { DepartmentMapper } from '../mappers/departments'

const Schema = new mongoose.Schema<DepartmentFromModel>({
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
	facultyId: {
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

export const Department = mongoose.model<DepartmentFromModel>('StranerdSchoolDepartment', Schema)

generateChangeStreams<DepartmentFromModel, DepartmentEntity>(Department, DepartmentChangeStreamCallbacks, new DepartmentMapper().mapFrom).then()