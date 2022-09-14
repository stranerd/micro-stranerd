export { EmbeddedUser } from '@modules/users'

import { MediaOutput } from '@utils/app/package'

export type Media = MediaOutput

export enum QuestionMetaType {
	comments = 'comments'
}

export type QuestionMeta = Record<QuestionMetaType, number>

export enum AnswerMetaType {
	comments = 'comments',
	likes = 'likes',
	dislikes = 'dislikes'
}

export type AnswerMeta = Record<AnswerMetaType, number>