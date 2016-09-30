import * as types from '../constants/ActionTypes';

const initialState = {
    fetching: false,
    fetched: false,
    torrents: []
}

const torrentReducer = (state=initialState, action) => {
    switch (action.type) {

        case types.FETCH_TORRENTS_START:
            return Object.assign({}, state, {
                fetching: true,
                torrents: []
            });

        case types.FETCH_TORRENTS_END:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                pagination: action.payload.pagination,
                torrents: action.payload.torrents,
            });

        case types.UPDATE_TORRENTS:
            return Object.assign({}, state, {
                torrents: action.data.torrents
            })

        case types.CHANGE_PAGE:
            return Object.assign({}, state, {
                pagination: action.data.pagination,
                torrents: action.data.torrents
            })

        default:
            return state
    }
}

export default torrentReducer