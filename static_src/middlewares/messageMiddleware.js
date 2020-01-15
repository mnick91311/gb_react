import { SEND_MESSAGE, sendMessage } from '../actions/messageActions'

export default store => next => action => {
    switch (action.type) {
        case SEND_MESSAGE:
            if (action.sender === 'me') {
                setTimeout(() => {
                    store.dispatch(
                        sendMessage(
                            `f${new Date().getTime().toString(16)}`,
                            "Не приставай ко мне. я робот!",
                            "Bot",
                            action.chatId,
                        )
                    )
                }, 3000)
            }
    }
    return next(action)
}