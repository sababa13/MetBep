var http = require('http');

http.createServer(onRequest).listen(8000);
console.log('Server has started');

function onRequest(request, response) {
    response.writeHead(200);
    response.write('Shalom');
    response.end();
}