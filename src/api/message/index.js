// @flow
import Message from "entities/message";
import { Session } from "@opentok/client";

export default class MessageAPI{

  static async sendMessage(session:Session, message:Message){
    await new Promise((resolve, reject) => {
      session.signal({
        type: "message",
        data: JSON.stringify(message.toJSON())
      }, (err) => {
        if(err) reject(err);
        else resolve();
      });
    })
  };
}