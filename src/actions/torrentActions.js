import * as types from '../constants/ActionTypes';
import axios from 'axios';
import * as constants from '../constants/Constants';

export function fetchTorrents(filter, pageNumber=1) {
	let url = ''
	switch (filter) {
		case "all":
			url = constants.BASE_URL + '?page=' + pageNumber
			break;
		case "downloading":
			url = constants.BASE_URL + '/downloading/'
			break;
		case "seeding":
			url = constants.BASE_URL + '/active/'
			break;
	  default:
		url = constants.BASE_URL + '?page=' + pageNumber
	}

	return (dispatch) => {
		dispatch({type: types.FETCH_TORRENTS_START})
		axios.get(url)
			.then((response) => {
				dispatch({
					type: types.FETCH_TORRENTS_END,
					payload: response.data
				})
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

export function updateTorrents(filter, page_number=1) {
	let url = ''
	switch (filter) {
		case "all":
			url = constants.BASE_URL + '?page=' + page_number
			break;
		case "downloading":
			url = constants.BASE_URL + '/downloading/'
			break;
		case "seeding":
			url = constants.BASE_URL + '/active/'
			break;
	  default:
		url = constants.BASE_URL + '?page=' + page_number
	}

	return (dispatch) => {
		axios.get(url)
			.then((response) => {
				dispatch({
					type: types.UPDATE_TORRENTS,
					data: response.data
				})
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

export function addTorrent(url) {
    return (dispatch) => {
		axios.post(constants.BASE_URL + '/add/', {url: url})
			.then((response) => {
			})
			.catch((err) => {
				console.log(err);
			});
	}
}