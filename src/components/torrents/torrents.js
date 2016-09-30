import React, {Component} from 'react'
import ReactDOM from 'react-dom'
var _ = require('lodash');
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/torrentActions'
import { connect } from 'react-redux'

import Torrent from '../torrent/torrent'
import Loader from '../loader/loader'
import Pagination from '../pagination/pagination'

class Torrents extends Component {

    componentDidMount(){
        this.props.action.fetchTorrents()
        setInterval(function(){
            if(this.props.general.autoUpdate){
                this.props.action.updateTorrents(this.props.general.current_page, this.props.torrents.pagination.current_page)
            }
        }.bind(this), 3000)
    }

    renderMappedTorrents(torrents){
        let components = []
        if(torrents.length != 0){
            components = torrents.map((torrent) => <Torrent key={torrent.hash} data={torrent}/>)
        } else {
            return (<h5 id="no-torrent" style={{textAlign: 'center', color: '#4BAED0', marginTop: '100px'}}>Pas de torrent en téléchargement</h5>)
        }
        return components
    }

    renderPagination() {
        if(this.props.torrents.pagination !== undefined && this.props.torrents.pagination.has_next_page !== undefined ){
            return <Pagination pagination={this.props.torrents.pagination} currentPage={this.props.general.current_page} actions={this.props.action} />
        }
    }


    render() {

        if(this.props.torrents.fetching){
            return <Loader />
        }
        return(
            <div>
                {this.renderMappedTorrents(this.props.torrents.torrents)}
                {this.renderPagination()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        torrents: state.torrents,
        general: state.general
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Torrents)