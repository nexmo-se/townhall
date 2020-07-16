const OT = require("@app/entities/ot");
const Room = require("@app/entities/room");
const CustomError = require("@app/entities/error");
const DatabaseAPI = require("@app/api/database");

class RoomAPI{

  static parseQueryResponse(queryResponse){
    return queryResponse.rows.map((response) => new Room().fromDatabase(response))
  }

  /**
   * 
   * @param {Room} room 
   */
  static async createRoom(room){
    await DatabaseAPI.query(async (client) => {
      await client.query("INSERT INTO rooms(id, sessionId) VALUES($1, $2)", [ room.id, room.sessionId ]);
    });
  }

  /**
   * 
   * @param {Room} room 
   */
  static async generateSession(room){
    const isExists = await RoomAPI.isExistsById(room);
    if(!isExists){
      return new Promise((resolve, reject) => {
        OT.opentok.createSession({ mediaMode: "routed" }, async (err, session) => {
          if(err) reject(new CustomError("room/err", err.message));
          else {
            const newRoom = new Room(room.id, session.sessionId);
            await RoomAPI.createRoom(newRoom);
            resolve(newRoom);
          }
        });
      });
    }else{
      const [ selectedRoom ] = await RoomAPI.getDetailById(room);
      return Promise.resolve(selectedRoom);
    }
  }

  /**
   * 
   * @param {Room} room 
   */
  static async getDetailById(room){
    return await DatabaseAPI.query(async (client) => {
      const queryResponse = await client.query("SELECT * FROM rooms WHERE id = $1", [ room.id ]);
      if(queryResponse.rowCount === 0) throw new CustomError("room/not-found", "Cannot find room");
      else return Promise.resolve(RoomAPI.parseQueryResponse(queryResponse));
    })
  }

  /**
   * 
   * @param {Room} room 
   */
  static async isExistsById(room){
    try{
      await RoomAPI.getDetailById(room);
      return Promise.resolve(true);
    }catch(err){
      if(err.code === "room/not-found") return Promise.resolve(false);
      else throw err;
    }
  }
}
module.exports = RoomAPI;