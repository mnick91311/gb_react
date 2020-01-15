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