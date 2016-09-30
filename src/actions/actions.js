import * as types from '../constants/ActionTypes';
import axios from 'axios';
import * as constants from '../constants/Constants';

export function changeCurrentPage(current_page) {
    return {
        type: types.CHANGE_CURRENT_PAGE,
        current_page: current_page
    }
}

export function setTopbarData() {
	return (dispatch) => {
		axios.get(constants.BASE_URL + '/topbar/')
			.then((response) => {
				dispatch({
					type: types.SET_TOPBAR_DATA,
					data: response.data
				})
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

export function switchAutoUpdate() {
    return {
        type: types.SWITCH_AUTO_UPDATE,
    }
}