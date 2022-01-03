import { AuthUser, RefreshUser } from '../../utils/authUser'
import { StorageFile } from '../../storage'

type HeaderKeys = 'AccessToken' | 'RefreshToken' | 'Referer' | 'ContentType' | 'UserAgent'

export class Request {
	readonly method: string
	readonly path: string
	readonly body: Record<string, any>
	readonly params: Record<string, string>
	readonly query: Record<string, string>
	readonly headers: Record<HeaderKeys, any>
	readonly files: StorageFile[]
	authUser: null | AuthUser = null
	refreshUser: null | RefreshUser = null

	constructor ({
		             body, params, query,
		             method, path, headers, files,
		             data
	             }: {
		body: Record<string, any>
		params: Record<string, any>
		query: Record<string, any>
		headers: Record<HeaderKeys, any>
		files: StorageFile[]
		method: string
		path: string,
		data: Record<string, any>
	}) {
		this.method = method
		this.path = path
		this.body = body
		this.params = params
		this.query = Object.fromEntries(
			Object.entries(query ?? {})
				.map(([key, val]) => [key, this.parseQueryStrings(val as any)])
		)
		this.headers = headers
		this.files = files
		this.authUser = data.authUser ?? null
		this.refreshUser = data.refreshUser ?? null
	}

	private parseQueryStrings (value: string | string[]) {
		if (Array.isArray(value)) return value.map(this.parseQueryStrings)
		try {
			return JSON.parse(value)
		} catch (e) {
			return value
		}
	}
}