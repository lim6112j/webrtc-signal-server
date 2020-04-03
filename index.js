const io = require('socket.io');
const server = io.listen(8000);

server.on('connection', (socket) => {
  console.info(`Client connected [id=${socket.id}]`);
  let token = socket.handshake.query.token;
  console.log(token);
  log(token);
  // convenience function to log server messages on the client
  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    socket.emit('log', array);
  }
  socket.on('message', function(message) {
    log('Client said: ', message);
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});