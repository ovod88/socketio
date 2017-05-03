var socket = io();

socket.on('connect', function() {
    console.log('Connected to SocketIO!');
});

socket.on('message', function(message) {
    console.log('Message received:');
    console.log(message.text);
});