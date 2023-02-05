// @ts-ignore
import { Email, EventTypes, MediaOutput, PhoneText } from '../commons'
import { Ev } from './enums'


declare module '@utils/app/commons/events/events' {
    interface Events {
        [EventTypes.SENDMAIL]: {
            topic: typeof Ev.SENDMAIL,
            data: Email
        },
        [EventTypes.DELETEFILE]: {
            topic: typeof Ev.DELETEFILE,
            data: MediaOutput
        },
        [EventTypes.SENDTEXT]: {
            topic: typeof Ev.SENDTEXT,
            data: PhoneText
        }
    }
}