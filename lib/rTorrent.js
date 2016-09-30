let Rtorrent = require('node-rtorrent');
let config = require('../rTorrentConfig.js')

let rtorrent = new Rtorrent(config.rtorrentConnexion);

const status = {
    '0': 'Stopped',
    '1': 'Paused',
    '2': 'Seeding',
    '3': 'Downloading',
    '4': 'Checking'
}

const infos = {
    name: 'd.name=',
    hash: 'd.get_hash',
    size: 'd.get_size_bytes',
    completed: 'd.get_completed_bytes',
    download_rate: 'd.get_down_rate ',
    upload_rate: 'd.get_up_rate',
    ratio: 'd.get_ratio',
    date: 'd.get_creation_date',
    state: 'd.get_state=',
    status_complete: 'd.complete=',
    status_is_active: 'd.is_active=',
    status_is_hash_checking: 'd.is_hash_checking=',
    status_is_open: 'd.is_open='
};

let get_status = function(state, complete, active, cheking, isopen){
    if (state == 0 && isopen == 0) {
        return 0
    } else if (active == 1) {
        if (complete == 1) {
            return 2
        } else {
            return 3
        }
    } else if (cheking == 1) {
        return 4
    } else {
        return 1
    }
}

let humanFileSize = function(size) {
    if (size == '0') {
        return 0
    }
    var i = Math.floor( Math.log(size) / Math.log(1024) );
    return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

exports.getTorrents = function(callback) {

    rtorrent.getMulticall('d.multicall', ['main'], infos, function (err, data) {
        if(data) {
            data.forEach(function (torrent) {
                torrent.percent = Math.ceil((torrent.completed / torrent.size) * 100)
                torrent.size = humanFileSize(torrent.size)
                torrent.completed = humanFileSize(torrent.completed)
                torrent.download_rate = humanFileSize(torrent.download_rate)
                torrent.upload_rate = humanFileSize(torrent.upload_rate)
                torrent.status = status[get_status(
                    torrent.state,
                    torrent.status_complete,
                    torrent.status_is_active,
                    torrent.status_is_hash_checking,
                    torrent.status_is_open
                )]
                torrent.ratio = torrent.ratio / 1000
            });
            callback(data);
        }
        
    })
};

exports.addTorrent = (url, callback) => {
    rtorrent.loadLink(url, function (err, data) {
        if (err) return console.log('err: ', err);
        callback(data)
    });
};