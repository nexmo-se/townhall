const CustomError = require("@app/entities/error");
const { Pool } = require("pg");

class DatabaseAPI{
  static pool = null;

  static async initialize(){
    if(DatabaseAPI.pool) throw new CustomError("database/intialized", "You can only initialized once");
    DatabaseAPI.pool = new Pool({ connectionString: process.env.DATABASE_URL});
  }

  static async query(func){
    const client = await DatabaseAPI.pool.connect();
    try{
      return await func(client);
    }finally{ client.release() }
  }

  static async migrate(){
    await DatabaseAPI.query(async (client) => {
      await client.query(`
        CREATE TABLE IF NOT EXISTS rooms(
          id VARCHAR(255) PRIMARY KEY,
          sessionId VARCHAR(255)
        )
      `);
    });
  }

  static get client(){
    if(!DatabaseAPI.pool) throw new CustomError("database/not-initliazed", "You need to initialize first");
    else return DatabaseAPI.pool;
  }

}
module.exports = DatabaseAPI;