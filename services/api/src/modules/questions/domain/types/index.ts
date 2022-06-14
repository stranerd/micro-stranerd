export { EmbeddedUser } from '@modules/users'

import { MediaOutput } from '@utils/commons'

export type Media = MediaOutput

export enum AnswerMetaType {
	comments = 'comments',
	likes = 'likes',
	dislikes = 'dislikes'
}

export type AnswerMeta = Record<AnswerMetaType, number>