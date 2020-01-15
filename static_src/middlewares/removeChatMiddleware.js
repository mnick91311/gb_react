import { REMOVE_CHAT } from '../actions/chatActions'
import { REMOVE_MESSAGE, removeMessage } from '../actions/messageActions'

export default store => next => action => {
    switch (action.type) {
        case REMOVE_CHAT:
            store.dispatch(
                removeMessage(store.getState().chatReducer.chats[action.id].messageList, action.id)
            )
    }
    return next(action)
}