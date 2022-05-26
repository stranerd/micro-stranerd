import { EmbeddedUser, Media } from '../../domain/types'

export interface QuestionFromModel extends QuestionToModel {
	_id: string
	bestAnswers: string[]
	answers: { id: string, userId: string }[]
	createdAt: number
	updatedAt: number
}

export interface QuestionToModel {
	body: string
	attachments: Media[]
	tagId: string
	user: EmbeddedUser
}
