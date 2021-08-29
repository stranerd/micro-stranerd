import { generateChangeStreams, mongoose } from '@utils/commons'
import { SubjectFromModel } from '../models'
import { SubjectChangeStreamCallbacks } from '@utils/changeStreams/questions/subjects'

const Schema = new mongoose.Schema<SubjectFromModel>({
	name: {
		type: String,
		required: true
	}
})

export const Subject = mongoose.model<SubjectFromModel>('Subject', Schema)

generateChangeStreams<SubjectFromModel>(Subject, SubjectChangeStreamCallbacks).then()