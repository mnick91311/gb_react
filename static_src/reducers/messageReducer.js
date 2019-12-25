import update from 'react-addons-update'
import { SEND_MESSAGE } from '../actions/messageActions'

const initialStore = {
    messages: {
        0: { author: 'Bot', text: "Привет", date: '2019-11-27T22:02:00+03' },
        1: { author: 'Bot', text: "Как дела?", date: '2019-11-27T22:02:03+03' },
    },
}

export default function chatReducer(store = initialStore, action) {
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
        default:
            return store
    }
}
