import { EmbeddedUser, Media } from '../../domain/types'

export interface AnswerFromModel extends AnswerToModel {
	_id: string
	best: boolean
	votes: { userId: string, vote: 1 | -1 }[]
	comments: number
	createdAt: number
	updatedAt: number
}

export interface AnswerToModel {
	body: string
	attachments: Media[]
	questionId: string
	tagId: string
	user: EmbeddedUser
}
