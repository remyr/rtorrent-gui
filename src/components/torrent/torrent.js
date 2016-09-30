import React, {Component} from 'react';


class Torrent extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data.upload_rate !== this.props.data.upload_rate
    }

    render() {
        let torrent = this.props.data
        return(
            <div>
                <div className="rtorrent-torrent" id={torrent.hash}>
                    <div className="rtorrent-torrent-name">{torrent.name}</div>
                    <div className="rtorrent-torrent-progress-info"><span className="torrent-completed">{torrent.completed}</span> of <span className="torrent-size">{torrent.size}</span> (<span className="torrent-progress-percent">{torrent.percent}</span>%) - {torrent.status}</div>
                    <div className="rtorrent-progress-bar">
                        <span className={torrent.percent == 100 ? 'rtorrent-current-progress-bar complete' : 'rtorrent-current-progress-bar'} style={{width: torrent.percent + '%'}}/>
                    </div>
                    <div className="rtorrent-torrent-controls-info">
                        <div className="rtorrent-torrent-controls">
                            <i className="material-icons">play_arrow</i>
                            <i className="material-icons">pause</i>
                            <i className="material-icons">stop</i>
                            <i className="material-icons">delete</i>
                        </div>
                        <div className="rtorrent-torrent-info">
                            <span className="download">
                                <i className="material-icons">arrow_downward</i> <div className="download-text">{torrent.download_rate}</div>/s
                            </span>
                            <span className="upload">
                                <i className="material-icons">arrow_upward</i> <div className="upload-text">{torrent.upload_rate}</div>/s
                            </span>
                            <span className="ratio">Ratio: <div className="ratio-text">{torrent.ratio}</div></span>
                        </div>
                    </div>
                </div>

                <div className="rtorrent-torrent-separator"></div>

            </div>
        )
    }
}

export default Torrent