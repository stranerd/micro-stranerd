import { CommentRepository } from './data/repositories/comments'
import { LikeRepository } from './data/repositories/likes'
import { ViewRepository } from './data/repositories/views'
import { CommentsUseCase } from './domain/useCases/comments'
import { LikesUseCase } from './domain/useCases/likes'
import { ViewsUseCase } from './domain/useCases/views'

const commentRepository = CommentRepository.getInstance()
const likeRepository = LikeRepository.getInstance()
const viewRepository = ViewRepository.getInstance()

export const CommentsUseCases = new CommentsUseCase(commentRepository)
export const LikesUseCases = new LikesUseCase(likeRepository)
export const ViewsUseCases = new ViewsUseCase(viewRepository)

export { CommentFromModel } from './data/models/comments'
export { LikeFromModel } from './data/models/likes'
export { ViewFromModel } from './data/models/views'
export { CommentEntity } from './domain/entities/comments'
export { LikeEntity } from './domain/entities/likes'
export { ViewEntity } from './domain/entities/views'
export { InteractionEntities, CommentMetaType } from './domain/types'