const OT = require("@app/entities/ot");
const User = require("@app/entities/user");
const Room = require("@app/entities/room");

class UserAPI{
  
  /**
   * 
   * @param {Room} room 
   * @param {User} user 
   * @param {object} data
   */
  static generateToken(room, user, data){
    const token = OT.opentok.generateToken(room.sessionId, { role: user.role, data: JSON.stringify(data) });
    const newUser = new User(user.id, token);
    return newUser;
  }
}
module.exports = UserAPI;