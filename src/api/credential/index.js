// @flow
import Credential from "entities/credential";
import config from "config";

export default class CredentialAPI{
  static async generateCredential(role:string="publisher", data:any={}){
    const jsonResult = await (await fetch(`https://ot-token-generator.herokuapp.com/room/${config.roomName}/info`, {
      method: "POST", headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ role, data })
    })).json();
    const credential = new Credential(jsonResult.apiKey, jsonResult.sessionId, jsonResult.token);
    return credential;
  }
}