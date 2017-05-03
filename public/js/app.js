var socket = io();

socket.on('connect', function() {
    console.log('Connected to SocketIO!');
});

socket.on('message', function(message) {
    console.log('Message received:');
    console.log(message.text);
});

var $form = $('form');

$form.on('submit', function(e){
    e.preventDefault();
    var $message = $form.find('input[name=message]');

    socket.emit('message', {
        text: $message.val()
    });

    $message.val('');
});