import { MediaOutput } from '@utils/commons'
import { UserBio } from '../../domain/types'

export interface VideoFromModel extends VideoToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface VideoToModel {
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