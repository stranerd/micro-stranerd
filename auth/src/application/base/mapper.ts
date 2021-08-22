export abstract class Mapper<From, To, Entity> {
	abstract mapFrom (param: From | null): Entity | null

	abstract mapTo (param: Entity): To
}