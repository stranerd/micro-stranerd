import { ChangeStreamCallbacks } from '@utils/commons'
import { AnswerUpvoteFromModel } from '@modules/questions/data/models/answerUpvotes'
import { AnswerUpvoteEntity } from '@modules/questions/domain/entities'

export const AnswerUpvoteChangeStreamCallbacks: ChangeStreamCallbacks<AnswerUpvoteFromModel, AnswerUpvoteEntity> = {}