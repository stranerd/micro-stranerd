// @ts-ignore
import { Email, EventTypes, MediaOutput, PhoneText } from '../commons'

declare module '@utils/app/commons/events/events' {
    interface Events {
        [EventTypes.SENDMAIL]: {
            topic: typeof EventTypes.SENDMAIL,
            data: Email
        },
        [EventTypes.DELETEFILE]: {
            topic: typeof EventTypes.DELETEFILE,
            data: MediaOutput
        },
        [EventTypes.SENDTEXT]: {
            topic: typeof EventTypes.SENDTEXT,
            data: PhoneText
        }
    }
}