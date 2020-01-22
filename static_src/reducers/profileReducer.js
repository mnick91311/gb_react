import update from 'react-addons-update'
import { 
    START_PROFILE_LOADING,
    SUCCESS_PROFILE_LOADING,
    ERROR_PROFILE_LOADING,
} from '../actions/profileActions'

const initialStore = {
    profile: {},
    isLoading: true,
}

export default function profileReducer(store = initialStore, action) {
    switch (action.type) {
        case START_PROFILE_LOADING: {
            return update(store, {
                isLoading: { $set: true },
            })
        }
        case SUCCESS_PROFILE_LOADING: {
            return update(store, {
                isLoading: { $set: false },
                profile: { $set: action.payload },
            })
        }
        case ERROR_PROFILE_LOADING: {
            return update(store, {
                isLoading: { $set: false },
            })
        }
        default:
            return store
    }
}
