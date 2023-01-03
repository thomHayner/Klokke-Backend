const webSocketsServerPort = 8080;
const webSocketServer = require('websocket').server;
const http = require('http');

// Spinning the http server.
const server = http.createServer();
server.listen(webSocketsServerPort, () => console.log('listening on port ' + webSocketsServerPort));

// Initiating websocket service.
const wsServer = new webSocketServer({
  httpServer: server
});

wsServer.on('request', function (request) {
  const connection = request.accept(null, request.origin);
  console.log(Date() + ' Recieved a new connection from origin ' + request.origin + '.');
  
  // Constantly broadcast the current server time, once every 0.25 seconds
  setInterval(() => connection.send(Date.now()), 250);

  // What to do when receiving a timer interaction from a client.
  connection.on('message', function(message) {
      console.log(`The client sent a message`);
  });

  // What to do when clients disconnects from server.
  connection.on('close', () => {
      console.log('The client has disconnected');
  });

  // Handling client connection error
  connection.on('error', (e) => {
    console.log('An error has occured: ' + e.message);
  });
});
