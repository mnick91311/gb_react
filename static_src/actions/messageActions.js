export const SEND_MESSAGE = '@@message/SEND_MESSAGE'
export const REMOVE_MESSAGE = '@@message/REMOVE_MESSAGE'

export const sendMessage = (messageId, text, sender, chatId) => ({
    type: SEND_MESSAGE,
    messageId,
    text,
    sender,
    chatId,
})

export const removeMessage = (messageIds, chatId) => ({
    type: REMOVE_MESSAGE,
    messageIds,
    chatId,
})