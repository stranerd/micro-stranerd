import { ChangeStreamCallbacks } from '@utils/commons'
import { VideoCommentFromModel, VideoEntity } from '@modules/resources'

export const VideoCommentChangeStreamCallbacks: ChangeStreamCallbacks<VideoCommentFromModel, VideoEntity> = {}