import { ChangeStreamCallbacks } from '@utils/commons'
import { NotificationFromModel } from '@modules/users/data/models/notifications'
import { NotificationEntity } from '@modules/users/domain/entities/notifications'

export const NotificationChangeStreamCallbacks: ChangeStreamCallbacks<NotificationFromModel, NotificationEntity> = {}