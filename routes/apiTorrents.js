/*========================================
      API ENDPOINT FOR '/api/torrents'
========================================*/

let express = require('express');
let router = express.Router();
let _ = require('lodash');
let rTorrent = require('../lib/rTorrent');
let paginator = require('../lib/paginator');

let app = express();

// GET ALL TORRENTS

router.get('/', (req, res) => {
    rTorrent.getTorrents((data) => {
        let sortedData = _.orderBy(data, 'date')
        res.json(paginator.constructPaginatorObject(sortedData.reverse(), req.query.page, 10))
    })
});

// GET ACTIVE TORRENTS

router.get('/active/', (req, res) => {
    rTorrent.getTorrents((data) => {
        let sorted_data = _.sortBy(data, 'date');
        let filtered_data = _.filter(sorted_data, (o) => { return o.upload_rate != 0});
        res.json({
            torrents:filtered_data.reverse(),
            pagination: {current_page: 1}
        })
    })
});

// GET DOWNLOADING TORRENTS

router.get('/downloading/', (req, res) => {
    rTorrent.getTorrents((data) => {
        let sorted_data = _.sortBy(data, 'date');
        let filtered_data = _.filter(sorted_data, (o) => { return o.status == 'Downloading'});
        res.json({
            torrents: filtered_data.reverse(),
            pagination: {current_page: 1}
        })
    })
});

// GET TOPBAR INFO

router.get('/topbar/', (req, res) => {
    rTorrent.getTorrents((data) => {
        let totalAll = data.length
        let totalDownloading = _.filter(data, (o) => { return o.status == 'Downloading'}).length
        let totalActive = _.filter(data, (o) => { return o.upload_rate != 0 || o.download_rate != 0}).length

        res.json({
            totalAll: totalAll,
            totalDownloading: totalDownloading,
            totalActive: totalActive
        })
    })
});

// ADD A TORRENT

router.post('/add/', (req, res) => {
    let url = req.body.url;
    rTorrent.addTorrent(url, (data) => {
        console.log('TORRENT ADDED', url)
        res.json({url: url, rTorrentRes: data})
    });
});

module.exports = router;