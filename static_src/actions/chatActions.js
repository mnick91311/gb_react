export const ADD_CHAT = '@@chat/ADD_CHAT'
export const REMOVE_CHAT = '@@chat/REMOVE_CHAT'
export const BLINK_ON = '@@chat/BLINK_ON'
export const BLINK_OFF = '@@chat/BLINK_OFF'

export const addChat = (title) => ({
    type: ADD_CHAT,
    title,
})

export const removeChat = (id) => ({
    type: REMOVE_CHAT,
    id
})

export const blinkOn = (id, timeoutId) => ({
    type: BLINK_ON,
    id,
    timeoutId,
})

export const blinkOff = (id) => ({
    type: BLINK_OFF,
    id,
})

import { RSAA, getJSON } from 'redux-api-middleware'
import { normalize } from 'normalizr'
import { chats } from '../utils/schemas'

export const START_CHATS_LOADING = '@@message/START_CHATS_LOADING'
export const SUCCESS_CHATS_LOADING = '@@message/SUCCESS_CHATS_LOADING'
export const ERROR_CHATS_LOADING = '@@message/ERROR_CHATS_LOADING'

export const loadChats = () => ({
    [RSAA]: {
        endpoint: '/api/chats.json',
        method: 'GET',
        types: [
            START_CHATS_LOADING,
            {
                type: SUCCESS_CHATS_LOADING,
                payload: (action, state, res) => getJSON(res).then(
                    json => normalize(json, [chats]),
                ),
            },
            ERROR_CHATS_LOADING,
        ],
    },
})