import React, { Component } from 'react'
import { connect } from 'react-redux'

import Topbar from './topbar/topbar'
import Torrents from './torrents/torrents'
//import Torrents from './torrents'

class RtorrentGui extends Component {

    render() {
        return(
            <div>
                <Topbar />
                <Torrents />
            </div>
        )
    }
}

export default RtorrentGui