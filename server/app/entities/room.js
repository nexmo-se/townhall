class Room{
  constructor(id, sessionId){
    this.id = id;
    this.sessionId = sessionId;
  }

  fromDatabase(row){
    this.id = row.id;
    this.sessionId = row.sessionid;
    return this;
  }
}
module.exports = Room;