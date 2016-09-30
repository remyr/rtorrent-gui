import * as types from '../constants/ActionTypes';

const initialState = {
    current_page: 'all',
    autoUpdate: true,
    topbarData: {
        totalAll: '0',
        totalDownloading: '0',
        totalActive: '0',
    }
}

const generalReducer = (state=initialState, action) => {
    switch (action.type) {

        case types.CHANGE_CURRENT_PAGE:
            return Object.assign({}, state, {
                current_page: action.current_page,
            });

        case types.SET_TOPBAR_DATA:
            return Object.assign({}, state, {
                topbarData: action.data
            });

        case types.SWITCH_AUTO_UPDATE:
            return Object.assign({}, state, {
                autoUpdate: !state.autoUpdate
            })

        default:
            return state
    }
}

export default generalReducer