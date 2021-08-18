export abstract class Cache {
	abstract set (key: string, data: string, ttl: number): Promise<void>

	abstract get (key: string): Promise<string | null>

	abstract delete (key: string): Promise<void>
}