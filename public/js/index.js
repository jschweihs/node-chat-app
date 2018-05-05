var socket = io();

// New connection
socket.on('connect', function () {
  console.log('Connected to server');
});

// User disconnected
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// Listening for new message
socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = $('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`)
  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = $('<li></li>');
  var a = $('<a target="_blank">My Location</a>');
  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
})

// Submit message when send button is clicked
$('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = $('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location..');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location.');
  })
});
