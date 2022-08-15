import { AuthUseCases } from '@modules/auth'
import { Request, validate, Validation } from '@utils/commons'
import { generateAuthOutput, verifyReferrer } from '@utils/modules/auth'

export class IdentitiesController {
	static async googleSignIn (req: Request) {
		const validatedData = validate({
			idToken: req.body.idToken,
			accessToken: req.body.accessToken,
			referrer: req.body.referrer ?? null
		}, {
			idToken: { required: true, rules: [Validation.isString] },
			accessToken: { required: true, rules: [Validation.isString] },
			referrer: { required: true, nullable: true, rules: [Validation.isString] }
		})

		const data = await AuthUseCases.googleSignIn({
			...validatedData,
			referrer: await verifyReferrer(validatedData.referrer) ? validatedData.referrer : null
		})
		return await generateAuthOutput(data)
	}
}