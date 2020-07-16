const OpenTok = require("opentok");

class OT{
  static _instance = null;

  static get opentok(){
    if(!OT._instance) OT._instance = new OpenTok(process.env.API_KEY, process.env.API_SECRET);
    return OT._instance;
  }
}
module.exports = OT;