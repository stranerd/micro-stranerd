import { ChangeStreamCallbacks } from '@utils/commons'
import { NotificationEntity, NotificationFromModel } from '@modules/users'

export const NotificationChangeStreamCallbacks: ChangeStreamCallbacks<NotificationFromModel, NotificationEntity> = {}