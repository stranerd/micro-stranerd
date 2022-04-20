import { GoogleSignIn } from '@modules/auth'
import { Request, validate, Validation } from '@utils/commons'
import { generateAuthOutput } from '@utils/modules/auth'

export class IdentitiesController {
	static async googleSignIn (req: Request) {
		const validatedData = validate({
			idToken: req.body.idToken,
			accessToken: req.body.accessToken,
			referrer: req.body.referrer
		}, {
			idToken: { required: true, rules: [Validation.isString] },
			accessToken: { required: true, rules: [Validation.isString] },
			referrer: { required: false, rules: [Validation.isString] }
		})

		const data = await GoogleSignIn.execute(validatedData)
		return await generateAuthOutput(data)
	}
}