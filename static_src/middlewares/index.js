import messageMiddleware from './messageMiddleware'
import blinkMiddleware from './blinkMiddleware'
import removeChatMiddleware from './removeChatMiddleware'

export default [
    messageMiddleware,
    blinkMiddleware,
    removeChatMiddleware,
]