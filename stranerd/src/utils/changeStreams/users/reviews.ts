import { ChangeStreamCallbacks } from '@utils/commons'
import { ReviewFromModel } from '@modules/users/data/models/reviews'
import { ReviewEntity } from '@modules/users/domain/entities/reviews'

export const ReviewChangeStreamCallbacks: ChangeStreamCallbacks<ReviewFromModel, ReviewEntity> = {}