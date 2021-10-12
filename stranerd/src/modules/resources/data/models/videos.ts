import { MediaOutput } from '@utils/commons'
import { UserBio } from '../../domain/types'

export interface VideoFromModel extends VideoToModel {
	_id: string
	commentsCount: number
	createdAt: number
	updatedAt: number
}

export interface VideoToModel {
	isHosted: boolean
	link: string | null
	media: MediaOutput | null
	userId: string
	userBio: UserBio
	title: string
	description: string
}