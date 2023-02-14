import { Email, EventTypes, MediaOutput, PhoneText } from '../package'

declare module 'equipped/lib/events/events' {
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