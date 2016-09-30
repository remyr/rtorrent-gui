import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import RtorrentGui from './components/rtorrentGui'

require('./styles/style.min.css')

const store = configureStore();

let rootId = document.getElementById('rtorrent-app')

if(rootId){
    ReactDom.render(
        <Provider store={store}>
            <RtorrentGui />
        </Provider>,
        document.getElementById('rtorrent-app')
    );
}