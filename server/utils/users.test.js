const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Test'
    }, {
      id: '2',
      name: 'Roo',
      room: 'Test2'
    }, {
      id: '3',
      name: 'Tom',
      room: 'Test'
    }];
});

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '1',
      name: 'Jake',
      room: 'Test'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userId = '2';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var userId = '4';
    var user = users.removeUser(userId);
    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userId = '2';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    var userId = '4';
    var user = users.getUser(userId);
    expect(user).toBeFalsy();
  });
  it('should return names for Test room', () => {
    var userList = users.getUserList('Test');
    expect(userList).toEqual(['Mike', 'Tom']);
  });

  it('should return names for Test2 room', () => {
    var userList = users.getUserList('Test2');
    expect(userList).toEqual(['Roo']);
  });
});
