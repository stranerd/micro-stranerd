import { MediaOutput } from '@utils/commons'
import { UserBio } from '../../domain/types'

export interface NoteFromModel extends NoteToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface NoteToModel {
	isHosted: boolean
	link: string | null
	media: MediaOutput | null
	userId: string
	userBio: UserBio
	title: string
	tags: string[]
	schoolId: string
	courseId: string
}