import { SEND_MESSAGE } from '../actions/messageActions'
import { blinkOn, blinkOff, BLINK_ON, BLINK_OFF } from '../actions/chatActions'

export default store => next => action => {
    switch (action.type) {
        case SEND_MESSAGE:
            if (action.sender === 'Bot') {
                const timeoutId = setTimeout(() => {
                    store.dispatch(blinkOff(action.chatId))
                }, 300)
                store.dispatch(blinkOn(action.chatId, timeoutId))
            }
            break;
    }
    return next(action)
}