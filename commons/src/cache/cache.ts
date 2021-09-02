export abstract class Cache {
	abstract set (key: string, data: string, ttlInSecs: number): Promise<void>

	abstract setInTransaction (key: string, data: string, ttlInSecs: number): Promise<[string, string]>

	abstract get (key: string): Promise<string | null>

	abstract delete (key: string): Promise<void>
}