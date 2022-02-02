import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { PlaylistController } from '../../controllers/study/playlists'

export const playlistsRoutes: Route[] = [
	{
		path: '/study/playlists',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PlaylistController.GetPlaylist(req)
				}
			})
		]
	},
	{
		path: '/study/playlists/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PlaylistController.FindPlaylist(req)
				}
			})
		]
	},
	{
		path: '/study/playlists/:id',
		method: 'put',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PlaylistController.UpdatePlaylist(req)
				}
			})
		]
	},
	{
		path: '/study/playlists',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PlaylistController.CreatePlaylist(req)
				}
			})
		]
	},
	{
		path: '/study/playlists/:id',
		method: 'delete',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PlaylistController.DeletePlaylist(req)
				}
			})
		]
	}
]