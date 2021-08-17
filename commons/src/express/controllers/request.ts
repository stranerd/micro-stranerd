import { AuthUser, RefreshUser } from '../../utils/authUser'

type HeaderTypes = 'AccessToken' | 'RefreshToken' | 'Referer' | 'ContentType' | 'UserAgent'

export class Request {
	readonly method: string
	readonly path: string
	readonly body: Record<string, any>
	readonly params: Record<string, string>
	readonly query: Record<string, string>
	readonly headers: Record<HeaderTypes, any>
	authUser: null | AuthUser = null
	refreshUser: null | RefreshUser = null

	constructor ({
		body, params, query,
		method, path, headers
	}: {
		body: Record<string, any>
		params: Record<string, any>
		query: Record<string, any>
		headers: Record<HeaderTypes, any>
		method: string
		path: string
	}) {
		this.method = method
		this.path = path
		this.body = body
		this.params = params
		this.query = query
		this.headers = headers
	}
}