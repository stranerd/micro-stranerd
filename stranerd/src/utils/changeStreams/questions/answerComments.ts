import { ChangeStreamCallbacks } from '@utils/commons'
import { AnswerCommentFromModel } from '@modules/questions/data/models/answerComments'
import { AnswerCommentEntity } from '@modules/questions/domain/entities'

export const AnswerCommentChangeStreamCallbacks: ChangeStreamCallbacks<AnswerCommentFromModel, AnswerCommentEntity> = {}