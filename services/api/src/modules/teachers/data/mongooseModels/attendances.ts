import { generateChangeStreams, mongoose } from '@utils/app/package'
import { AttendanceFromModel } from '../models/attendances'
import { AttendanceChangeStreamCallbacks } from '@utils/changeStreams/teachers/attendances'
import { AttendanceEntity } from '../../domain/entities/attendances'
import { AttendanceMapper } from '../mappers/attendances'

const Schema = new mongoose.Schema<AttendanceFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	courseId: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as AttendanceFromModel['user'],
		required: true
	},
	members: {
		type: [String],
		required: false,
		default: []
	},
	attended: {
		type: [String],
		required: false,
		default: []
	},
	closedAt: {
		type: Number,
		required: false,
		default: null
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

export const Attendance = mongoose.model<AttendanceFromModel>('StranerdTeachersAttendance', Schema)

generateChangeStreams<AttendanceFromModel, AttendanceEntity>(Attendance, AttendanceChangeStreamCallbacks, new AttendanceMapper().mapFrom).then()