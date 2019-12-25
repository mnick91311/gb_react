import update from 'react-addons-update'
import { SEND_MESSAGE } from '../actions/messageActions'

const initialStore = {
    profile: {
        name: "User",
        email: "user@example.com",
        phone: "+7 (555)-555-55-55"
    }
}

export default function profileReducer(store = initialStore, action) {
    switch (action.type) {
        default:
            return store
    }
}
