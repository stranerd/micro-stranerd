export abstract class Mapper<From, To, Entity> {
	abstract mapFrom (param: From): Entity

	abstract mapTo (param: Entity): To
}