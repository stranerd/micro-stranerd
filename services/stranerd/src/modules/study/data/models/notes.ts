import { MediaOutput } from '@utils/commons'
import { UserBio } from '../../domain/types'

export interface NoteFromModel extends NoteToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface NoteToModel {
	isPublic: boolean
	isHosted: boolean
	preview: MediaOutput
	link: string | null
	media: MediaOutput | null
	userId: string
	userBio: UserBio
	title: string
	description: string
	tags: string[]
}