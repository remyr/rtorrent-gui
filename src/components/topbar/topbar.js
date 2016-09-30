import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/actions'
import * as fetchActions from '../../actions/torrentActions'
import { connect } from 'react-redux'

import Modal from '../modal/modal'


class Topbar extends Component {

    componentDidMount(){
        this.props.action.setTopbarData()
        setInterval(function(){
            if(this.props.autoUpdate){
                this.props.action.setTopbarData()
            }
        }.bind(this), 3000)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.topbarData !== this.props.topbarData ||
            nextProps.current_page != this.props.current_page ||
            nextProps.autoUpdate != this.props.autoUpdate
    }

    handleClick(event, current_page) {
        event.preventDefault();
        this.props.action.changeCurrentPage(current_page)
        this.props.fetchActions.fetchTorrents(current_page)
    }

    render() {
        let {totalAll, totalDownloading, totalActive} = this.props.topbarData
        return(
            <div className="rtorrent-topbar card" id="rtorrent-topbar">

                <a className="waves-effect waves-light btn add-btn modal-trigger" href="#modal1">
                    <i className="material-icons">add</i>
                </a>
                <div className="rtorrent-categories">
                    Afficher:
                    <a href="/rtorrent/" onClick={(e) => this.handleClick(e, 'all')} className={this.props.current_page == 'all' ? 'all actif' : 'all'}>Tous (<span id="data-all-length">{totalAll}</span>)</a>
                    <a href="#" onClick={(e) => this.handleClick(e, 'downloading')} className={this.props.current_page == 'downloading' ? 'downloading actif' : 'downloading'}>Téléchargement ({totalDownloading})</a>
                    <a href="/rtorrent/actif/" onClick={(e) => this.handleClick(e, 'seeding')} className={this.props.current_page == 'seeding' ? 'seeding actif' : 'seeding'}>Actif (<span id="data-actif-length">{totalActive}</span>)</a>
                </div>

                <div className="rtorrent-auto-update-switch">
                    Auto Update:
                    <div className="switch">
                    <label>
                      Off
                        <input type="checkbox" checked={this.props.autoUpdate} onChange={this.props.action.switchAutoUpdate}/>
                        <span className="lever"/>
                      On
                    </label>
                  </div>
                </div>
                <Modal addTorrent={this.props.fetchActions.addTorrent} />

            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.general
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actions, dispatch),
        fetchActions: bindActionCreators(fetchActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)