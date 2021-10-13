import { ChangeStreamCallbacks } from '@utils/commons'
import { VideoEntity, VideoFromModel } from '@modules/resources'

export const VideoChangeStreamCallbacks: ChangeStreamCallbacks<VideoFromModel, VideoEntity> = {}