import {combineReducers} from 'redux';
import generalReducer from './generalReducer'
import torrentReducer from './torrentReducer'

const rootReducer = combineReducers({
    general: generalReducer,
    torrents: torrentReducer
});

export default rootReducer;