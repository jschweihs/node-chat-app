var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    // store res in variable
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);
    // assert from and text matches
    expect(message).toMatchObject({from, text});
    // assert createdAt is a number
    expect(typeof message.createdAt).toBe('number');
  })
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Joe';
    var latitude = 15;
    var longitude = 19;
    var url = `https://google.com/maps?q=15,19`;

    var message = generateLocationMessage(from, latitude, longitude);

    expect(message).toMatchObject({from, url});
    expect(typeof message.createdAt).toBe('number');
  });
});
