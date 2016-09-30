let server = require('./server/index');
let port = 3000;

server.listen(port, function(){
    console.log('Server running on PORT: ' + port)
});