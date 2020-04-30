// @flow
import { Stream, Connection, Subscriber } from "@opentok/client";

class User{
  name:string;
  id:string|void;
  stream:Stream|void;
  connection:Connection|void;
  subscriber:Subscriber|void;
  role:string

  constructor(name:string, role:string, id?:string, stream?:Stream){
    this.name = name;
    this.role = role;
    this.id = id;
    this.stream = stream;
  }

  toJSON(){
    const jsonData = {
      id: this.id,
      name: this.name,
      role: this.role
    }
    return JSON.parse(JSON.stringify(jsonData));
  }

  static fromJSON(data:any):User{
    const user = new User(data.name, data.role, data.id);
    return user;
  }
}
export default User;