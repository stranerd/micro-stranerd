export { EmbeddedUser } from '@modules/users'

import { MediaOutput } from '@utils/commons'

export type Media = MediaOutput

export enum AnswerMetaType {
	comments = 'comments',
	upvotes = 'upvotes',
	downvotes = 'downvotes'
}

export type AnswerMeta = Record<AnswerMetaType, number>