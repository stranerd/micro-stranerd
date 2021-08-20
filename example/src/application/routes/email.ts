import { Emails, EventTypes, makeController, readEmailFromPug, Route, StatusCodes } from '@utils/commons'
import { publishers } from '@utils/events'

const sendMail: Route = {
	path: '/emails/:email',
	method: 'get',
	controllers: [
		makeController(async (req) => {
			const { email } = req.params
			const emailContent = await readEmailFromPug('../../emails/test.pug', {
				message: `A sample email was just to ${ email }`
			})
			await publishers[EventTypes.SENDMAIL].publish({
				to: email,
				subject: 'Hello From Example',
				from: Emails.NO_REPLY,
				content: emailContent
			})
			return {
				status: StatusCodes.Ok,
				result: 'data'
			}
		})
	]
}

const routes: Route[] = [sendMail]
export default routes