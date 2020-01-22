import update from 'react-addons-update'
import { SEND_MESSAGE, REMOVE_MESSAGE, SUCCESS_MESSAGES_LOADING } from '../actions/messageActions'
import { 
    ADD_CHAT, 
    REMOVE_CHAT,
    BLINK_ON,
    BLINK_OFF,
    START_CHATS_LOADING,
    SUCCESS_CHATS_LOADING,
    ERROR_CHATS_LOADING,
} from '../actions/chatActions'

const initialStore = {
    chats: {},
    isLoading: true,
}

export default function chatReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
            return update(store, {
                chats: { $merge: { [action.chatId]: {
                    title: store.chats[action.chatId].title,
                    messageList: [...store.chats[action.chatId].messageList, action.messageId],
                    timeoutId: store.chats[action.chatId].timeoutId
                }}},
            })
        }
        case ADD_CHAT: {
            const chatId = `f${new Date().getTime().toString(16)}`
            return update(store, {
                chats: { $merge: {
                    [chatId]: {
                        title: action.title,
                        messageList: [],
                    }
                }}
            })
        }
        case BLINK_ON: {
            const id = action.id
            const prevTimeoutId = store.chats[id].timeoutId
            if (prevTimeoutId) {
                clearTimeout(prevTimeoutId)
            }
            return update(store, {
                chats: { $merge: {
                    [id]: {
                        title: store.chats[id].title,
                        messageList: store.chats[id].messageList,
                        timeoutId: action.timeoutId
                    }
                }}
            })
        }
        case BLINK_OFF: {
            const id = action.id
            const prevTimeoutId = store.chats[id].timeoutId
            if (prevTimeoutId) {
                clearTimeout(prevTimeoutId)
            }
            return update(store, {
                chats: { $merge: {
                    [id]: {
                        title: store.chats[id].title,
                        messageList: store.chats[id].messageList,
                        timeoutId: null
                    }
                }}
            })
        }
        case REMOVE_MESSAGE: {
            return update(store, {
                chats: { $merge: { [action.chatId]: {
                    title: store.chats[action.chatId].title,
                    messageList: store.chats[action.chatId].messageList.filter( x => 
                        action.messageIds.indexOf(x) === -1 
                    ),
                    timeoutId: store.chats[action.chatId].timeoutId
                }}},
            })
        }
        case REMOVE_CHAT: {
            return update(store, {
                chats: { $apply: function(chats) {
                    const copy = Object.assign({}, chats)
                    delete copy[action.id]
                    return copy
                }}
            })
        }
        case START_CHATS_LOADING: {
            return update(store, {
                isLoading: { $set: true },
            })
        }
        case SUCCESS_CHATS_LOADING: {
            return update(store, {
                chats: { $set: action.payload.entities.chats },
                isLoading: { $set: false},
            })
        }
        case ERROR_CHATS_LOADING: {
            return update(store, {
                isLoading: { $set: false },
            })
        }
        default:
            return store
    }
}
