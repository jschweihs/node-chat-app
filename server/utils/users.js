class Users {
  // Create empty array of users
  constructor () {
    this.users = [];
  }
  // Add a new user
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  // Remove user from a room
  removeUser(id) {
    var user = this.getUser(id);
    if(user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }

  // Find a user
  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  // Get list of users
  getUserList(room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}


module.exports = {Users};
