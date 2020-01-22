import update from 'react-addons-update'
import { SEND_MESSAGE, REMOVE_MESSAGE } from '../actions/messageActions'
import { SUCCESS_CHATS_LOADING } from '../actions/chatActions'

const initialStore = {
    messages: {},
}

export default function messageReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
            return update(store, {
                messages: { $merge: { [action.messageId]: {
                    author: action.sender,
                    text: action.text,
                    date: new Date().toUTCString()
                }}},
            })
        }
        case REMOVE_MESSAGE: {
            return update(store, {
                messages: {
                    $apply: function(obj) {
                        let copy = Object.assign({}, obj)
                        for (let id of action.messageIds) {
                            delete copy[id]
                        }
                        return copy
                    }
                }
            })
        }
        case SUCCESS_CHATS_LOADING: {
            return update(store, {
                messages: { $set: action.payload.entities.messages },
            })
        }
        default:
            return store
    }
}
