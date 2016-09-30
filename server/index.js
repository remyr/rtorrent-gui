let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let apiTorrents = require('../routes/apiTorrents'); // ROUTES

app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(express.static('./react/react_rtorrent/dist'));
app.use(bodyParser.json());

app.use('/api/torrents', apiTorrents);

app.get('/', (req, res) => {
    res.render('rtorrent/rtorrent', {current_page: 'rtorrent'})
});

module.exports = app;
