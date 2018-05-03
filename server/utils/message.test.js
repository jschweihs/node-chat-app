var expect = require('expect');

var {generateMessage} = require('./message');

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
