import { EventTypes } from '@utils/commons'
import { publishers } from '@utils/events'

export const monitorUserEvent = (collection: any, pipeline = [{}],type: string) => {
       
	const changeSteam = collection.watch(pipeline)

	changeSteam.on('change',async (data) => {
		
	   if(type == 'insert')	await publishers[EventTypes.AUTHUSERCREATED].publish(data.fullDocument)
	   if(type == 'update') await publishers[EventTypes.AUTHUSERUPDATED].publish(data.fullDocument)

	})
}