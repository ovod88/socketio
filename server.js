var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

var clientInfo = {};

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
    console.log('Client connected to socket.io!');

    socket.on('joinRoom', function(req) {
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {
            name: 'System',
            text: req.name + ' has joined!',
            timestamp: moment().valueOf()
        })
    });

    socket.on('message', function(message) {
        console.log('Message ' + message.text);

        message.timestamp = moment().valueOf();
        io.to(clientInfo[socket.id].room).emit('message', message);
    });

    socket.emit('message', {
        name: 'System',
        text: 'Hello to my chat application',
        timestamp: moment().valueOf()
    });
});

http.listen(PORT, function() {
    console.log('Server started');
});



