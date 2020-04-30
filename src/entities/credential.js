// @flow
class Credential{
  apiKey:string;
  sessionId:string;
  token:string;

  constructor(apiKey:string, sessionId:string, token:string){
    this.apiKey = apiKey;
    this.sessionId = sessionId;
    this.token = token;
  }
}
export default Credential;