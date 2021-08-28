import { Document } from 'mongoose'

export interface SubjectFromModel extends Document  {
	_id: string
	name: string
	dates: {
		createdAt: number
	}
}

export interface SubjectToModel {
	name: string
}
