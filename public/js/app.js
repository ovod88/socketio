var name = getQueryVariable('name') || 'Anonymous';
var socket = io();

socket.on('connect', function() {
    console.log('Connected to SocketIO!');
});

socket.on('message', function(message) {
    var momentTimestamp = moment.utc(message.timestamp).local();
    $('.messages').append('<p>' + '<strong>' + message.name + ' </strong>' + '<strong>' +
            momentTimestamp.format('h:mm a') + ': </strong>' + message.text + '</p>')
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