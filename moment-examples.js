var moment = require('moment');
var now = moment();

//console.log(now.format());
//console.log(now.format('X'));
//console.log(now.format('x'));

var timestamp = 1493828083885;
var timestampMoment = moment.utc(timestamp).local();

console.log(timestampMoment.format('h:mm a'));

//now.subtract(1, 'year');
//console.log(now.format());
//
//console.log(now.format('MMM Do YYYY h:mma'));
