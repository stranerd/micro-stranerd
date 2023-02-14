import { AuthUseCases } from '@modules/auth'
import { Request, Schema, validateReq } from '@utils/app/package'
import { generateAuthOutput, verifyReferrer } from '@utils/modules/auth'

export class IdentitiesController {
	static async googleSignIn (req: Request) {
		const validatedData = validateReq({
			idToken: Schema.string(),
			referrer: Schema.string().nullable().default(null),
		}, req.body)

		const data = await AuthUseCases.googleSignIn({
			...validatedData,
			referrer: await verifyReferrer(validatedData.referrer) ? validatedData.referrer : null
		})
		return await generateAuthOutput(data)
	}

	static async appleSignIn (req: Request) {
		const { firstName, lastName, email, idToken, referrer } = validateReq({
			firstName: Schema.string().nullable(),
			lastName: Schema.string().nullable(),
			email: Schema.string().nullable(),
			idToken: Schema.string(),
			referrer: Schema.string().nullable().default(null),
		}, req.body)

		const data = await AuthUseCases.appleSignIn({
			data: { idToken, email, firstName, lastName },
			referrer
		})
		return await generateAuthOutput(data)
	}
}