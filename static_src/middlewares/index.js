import messageMiddleware from './messageMiddleware'
import blinkMiddleware from './blinkMiddleware'
import removeChatMiddleware from './removeChatMiddleware'
import { apiMiddleware } from 'redux-api-middleware'

export default [
    apiMiddleware,
    messageMiddleware,
    blinkMiddleware,
    removeChatMiddleware,
]