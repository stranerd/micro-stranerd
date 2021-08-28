import { Document } from 'mongoose'

export interface TagFromModel extends Document {
	_id: string
	count: number
}

export interface TagToModel {
	count: number
}
