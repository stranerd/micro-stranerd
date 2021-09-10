import { ChangeStreamCallbacks } from '@utils/commons'
import { AnswerUpvoteEntity, AnswerUpvoteFromModel } from '@modules/questions'

export const AnswerUpvoteChangeStreamCallbacks: ChangeStreamCallbacks<AnswerUpvoteFromModel, AnswerUpvoteEntity> = {}