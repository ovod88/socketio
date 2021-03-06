var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room') || 'room1';
var socket = io();

$('.room-title').text(room);

socket.on('connect', function() {
    console.log('Connected to SocketIO!');

    socket.emit('joinRoom', {
        name: name,
        room: room
    })
});

socket.on('message', function(message) {
    var momentTimestamp = moment.utc(message.timestamp).local();
    $messages = $('.messages');
    $message = $('<li class="list-group-item"></li>');

    $message.append('<p>' + '<strong>' + message.name + ' </strong>' + '<strong>' +
            momentTimestamp.format('h:mm a') + ': </strong>' + message.text + '</p>')
    $messages.append($message);
});

var $form = $('form');

$form.on('submit', function(e){
    e.preventDefault();
    var $message = $form.find('input[name=message]');

    socket.emit('message', {
        name: name,
        text: $message.val()
    });

    $message.val('');
});